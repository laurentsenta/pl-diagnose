package main

import (
	"context"
	"errors"
	"net/url"
	"time"

	bitswap "github.com/ipfs/go-bitswap"
	bsnet "github.com/ipfs/go-bitswap/network"
	"github.com/ipfs/go-cid"
	"github.com/ipfs/go-datastore"
	blockstore "github.com/ipfs/go-ipfs-blockstore"
	"github.com/libp2p/go-libp2p"
	"github.com/libp2p/go-libp2p-core/host"
	"github.com/libp2p/go-libp2p-core/peer"
	kadDHT "github.com/libp2p/go-libp2p-kad-dht"
	"github.com/libp2p/go-libp2p/p2p/protocol/identify"
	"github.com/libp2p/go-libp2p/p2p/protocol/ping"
)

type daemon struct {
	// host host.Host
	// idService identify.IDService
	// dht          kademlia
	// dhtMessenger *dhtpb.ProtocolMessenger
}

type ephemeralHost struct {
	// TODO: figure out what happens with ref / values x struct / interface
	host        host.Host
	idService   identify.IDService
	pingService *ping.PingService
	dht         *kadDHT.IpfsDHT
	// dhtMessenger *dhtpb.ProtocolMessenger
}

type IdentifyOutput struct {
	ID                 peer.ID  `json:"id,omitempty"`
	ParseAddressError  string   `json:"parseAddressError,omitempty"`
	ConnectToPeerError string   `json:"connectToPeerError,omitempty"`
	IdentifyPeerError  string   `json:"identifyPeerError,omitempty"`
	PingError          string   `json:"pingError,omitempty"`
	PingDurationMS     int64    `json:"pingDurationMS,omitempty"`
	Protocols          []string `json:"protocols,omitempty"`
	Addresses          []string `json:"addresses,omitempty"`
}

func newEphemeralHost(ctx context.Context) ephemeralHost {
	// h, err := libp2p.New(libp2p.ConnectionGater(&privateAddrFilterConnectionGater{}))
	h, err := libp2p.New() // TODO: in original we forbid private addr, why?
	if err != nil {
		panic(err) // TODO: handle better
	}

	id, err := identify.NewIDService(h, identify.UserAgent("ipfs-check"))
	if err != nil {
		panic(err) // TODO: handle better
	}

	p := ping.NewPingService(h)

	// Apparently this is pretty much identical to the DHTClient call.
	dht, err := kadDHT.New(ctx, h, kadDHT.Mode(kadDHT.ModeClient), kadDHT.BootstrapPeers(kadDHT.GetDefaultBootstrapPeerAddrInfos()...))

	// Note: None of the attempts above would bootstrap, I use the example from original IPFS-Check with NewFullRT. But I'm not sure why.

	if err != nil {
		panic(err) // TODO: handle better
	}

	// There are 3 different new function it's hard to tell which one to use.
	// dht, err := kadDHT.New(ctx, h, kadDHT.BootstrapPeers(kadDHT.GetDefaultBootstrapPeerAddrInfos()...))

	// new dht client takes a datastore and ignores bootstrap, why is the interface different from New? Does it means it doesn't
	// traverse the DHT at all (no bootstrap nodes)?
	// dht := kadDHT.NewDHTClient(ctx, h, datastore.NewMapDatastore())

	// NOTE: "Bootstrap tells the DHT to get into a bootstrapped state satisfying the IpfsRouter interface.""
	// I have no idea what that means, I just want to make sure the node connects at least to my bootstraping peers
	err = dht.Bootstrap(ctx)
	if err != nil {
		panic(err) // TODO: handle better
	}

	return ephemeralHost{host: h, idService: id, pingService: p, dht: dht}
}

func (d *daemon) runIdentify(ctx context.Context, uristr string) (IdentifyOutput, error) {
	out := IdentifyOutput{}

	u, err := url.ParseRequestURI(uristr)
	if err != nil {
		return out, err
	}

	maddr := u.Query().Get("addr")

	if maddr == "" {
		return out, errors.New("missing argument: addr")
	}

	ai, err := peer.AddrInfoFromString(maddr)

	if err != nil {
		out.ParseAddressError = err.Error()
		return out, nil
	}

	out.ID = ai.ID

	e := newEphemeralHost(ctx)
	defer e.host.Close()
	defer e.idService.Close()

	dialCtx, dialCancel := context.WithTimeout(ctx, 15*time.Second)
	defer dialCancel()

	// Note: I don't understand this API, I have to connect with a peer addr
	// before having the ability to call the dialPeer and get the conn for identify?

	// In the examples it's also quite convoluted,
	// I have to add the node to the peer store, before having
	// the ability to call connect.

	// Similarly, to get the identify payload you pretty much have to reconstruct
	// the data, I couldn't find the current snapshot for identify for a given peer.
	e.host.Peerstore().AddAddrs(ai.ID, ai.Addrs, time.Hour)
	err = e.host.Connect(ctx, *ai)

	if err != nil {
		out.ConnectToPeerError = err.Error()
		return out, nil
	}

	conn, err := e.host.Network().DialPeer(dialCtx, ai.ID)

	if err != nil {
		out.ConnectToPeerError = err.Error()
		return out, nil
	}

	// ping node
	ping := e.pingService.Ping(dialCtx, ai.ID)
	result := <-ping

	if result.Error != nil {
		out.PingError = result.Error.Error()
		return out, nil
	}
	out.PingDurationMS = result.RTT.Milliseconds()

	// identify node
	identifyC := e.idService.IdentifyWait(conn)

	select {
	case <-dialCtx.Done():
		out.IdentifyPeerError = "timeout when trying to identify the peer"
		return out, nil
	case <-identifyC:
		// done
	}

	protocols, err := e.host.Peerstore().GetProtocols(ai.ID)

	if err != nil {
		out.IdentifyPeerError = err.Error()
		return out, nil
	}

	out.Protocols = protocols

	addresses := e.host.Peerstore().Addrs(ai.ID)

	strAddresses := make([]string, len(addresses))

	for i, a := range addresses {
		strAddresses[i] = a.String()
	}

	out.Addresses = strAddresses

	// TODO: I would like to get the address seen by the other peer.
	// It should be in the identify protocol payload.

	return out, nil
}

type Provider struct {
	Id    string   `json:"id"`
	Addrs []string `json:"addresses"`
}

type FindContentOutput struct {
	ParseCIDError      string          `json:"parseCIDError,omitempty"`
	FindProvidersError string          `json:"findProvidersError,omitempty"`
	Providers          []peer.AddrInfo `json:"providers,omitempty"`
}

func (d *daemon) runFindContent(ctx context.Context, uristr string) (FindContentOutput, error) {
	out := FindContentOutput{}

	u, err := url.ParseRequestURI(uristr)
	if err != nil {
		return out, err
	}

	cidstr := u.Query().Get("cid")

	if cidstr == "" {
		return out, errors.New("missing argument: cid")
	}

	c, err := cid.Decode(cidstr)

	if err != nil {
		out.ParseCIDError = err.Error()
		return out, nil
	}

	e := newEphemeralHost(ctx)
	defer e.host.Close()
	defer e.idService.Close()

	// Without this there are no peer when the rest of the code executes
	// The fullrt implementation provides a Ready() method.
	time.Sleep(5 * time.Second)

	dialCtx, dialCancel := context.WithTimeout(ctx, 5*time.Second)
	defer dialCancel()

	providers, err := e.dht.FindProviders(dialCtx, c)

	if err != nil {
		out.FindProvidersError = err.Error()
		return out, nil
	}

	if len(providers) == 0 {
		out.FindProvidersError = "no providers found"
	}

	out.Providers = providers

	return out, nil
}

type AccessBitswapOutput struct {
	ParseCIDError     string `json:"parseCIDError,omitempty"`
	ParseAddressError string `json:"parseAddressError,omitempty"`
	GetBlockError     string `json:"getBlockError,omitempty"`
	BlockSizeBytes    int    `json:"blockSizeBytes,omitempty"`
	DurationMS        int64  `json:"durationMS,omitempty"`
}

func (d *daemon) runAccessBitswap(ctx context.Context, uristr string) (AccessBitswapOutput, error) {
	out := AccessBitswapOutput{}

	u, err := url.ParseRequestURI(uristr)
	if err != nil {
		return out, err
	}

	// Get CID
	cidstr := u.Query().Get("cid")

	if cidstr == "" {
		return out, errors.New("missing argument: cid")
	}

	c, err := cid.Decode(cidstr)

	if err != nil {
		out.ParseCIDError = err.Error()
		return out, nil
	}

	// Get Addr
	maddr := u.Query().Get("addr")

	if maddr == "" {
		return out, errors.New("missing argument: addr")
	}

	ai, err := peer.AddrInfoFromString(maddr)

	if err != nil {
		out.ParseAddressError = err.Error()
		return out, nil
	}

	e := newEphemeralHost(ctx)
	defer e.host.Close()
	defer e.idService.Close()

	dialCtx, dialCancel := context.WithTimeout(ctx, 10*time.Second)
	defer dialCancel()

	// NOTE: Right now I'm just using the regular bitswap API
	// The original ipfs-check was doing something finer by sending WANT message and processing response
	// themselves. I believe this should be more precise, because you KNOW it's your target node replying
	// with the data. But maybe disabling any swarm'ing with libp2p could get the same result (connect only to our target peer).
	bsn := bsnet.NewFromIpfsHost(e.host, nilRouter)
	// Note that in the doc they use 	bsnet "github.com/ipfs/go-graphsync/network", I'm not sure why,
	// does it mean the bitswap network is deprecated? Couldn't find anything in the doc.

	// Note: figuring out what is the ds.Batching and what a good default value to put there is hard (not doc'd).
	// This is a wrapper around a batching datastore wich is a datastore with batching operations.
	// So we have to find who implements the batching datastore.
	bstore := blockstore.NewBlockstore(datastore.NewMapDatastore())
	exchange := bitswap.New(ctx, bsn, bstore)
	defer exchange.Close()

	// First register the peer then try to connect to it.
	e.host.Peerstore().AddAddrs(ai.ID, ai.Addrs, time.Hour)
	bsn.ConnectTo(dialCtx, ai.ID)

	start := time.Now()
	block, err := exchange.GetBlock(dialCtx, c)
	duration := time.Since(start)

	if err != nil {
		out.GetBlockError = err.Error()
		return out, nil
	}

	out.BlockSizeBytes = block.Cid().ByteLen()
	out.DurationMS = duration.Milliseconds()

	return out, nil
}
