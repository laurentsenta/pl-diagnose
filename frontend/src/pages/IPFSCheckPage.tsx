import { CheckCID } from "components/CheckCID";

export const IPFSCheckPage: React.FC = () => {
  return (
    <div className="container pt-4">
      <h1 className="title">
        Check the retrievability of CID from an IPFS peer
      </h1>
      <h2 className="subtitle">
        Paste in a host peers multiaddr and a Content ID, to check if it is
        expected to be retrievable
      </h2>
      <CheckCID />
      <div className="content">
        <section className="">
          <h2 className="">Where do I find my multiaddr?</h2>
          <ul>
            <li className="">
              <strong>Using IPFS Desktop or IPFS WebUI</strong>
              <ul>
                <li>
                  Open the IPFS WebUI "Status" page via the IPFS Desktop menu or
                  by visiting "http://127.0.0.1:5001/webui" (when using the
                  default config settings)
                </li>
                <li>
                  If you want to test your peerID rather than a particular
                  address enter{" "}
                  <code>
                    /p2p/{"{"}YourPeerID{"}"}
                  </code>
                </li>
                <li>
                  If you want to test a particular address then click the
                  "Advanced" dropdown to see the node's addresses
                </li>
              </ul>
            </li>
            <li className="">
              <strong>Using the go-ipfs CLI</strong>
              <ul>
                <li>
                  If you want to test your peerID rather than a particular
                  address run <code>ipfs id</code> and enter{" "}
                  <code>
                    /p2p/{"{"}YourPeerID{"}"}
                  </code>
                </li>
                <li>
                  If you want to test a particular address then choose an entry
                  from the list of addresses output by <code>ipfs id</code>
                </li>
              </ul>
            </li>
          </ul>
          <h2 className="">What does it mean if I get an error?</h2>
          <ul>
            <li className="">
              <strong>Could not connect to the multiaddr</strong>. Machines on
              the internet cannot talk to your machine. Fix your firewall, add
              port forwarding, or use a relay.
            </li>
            <li className="">
              <strong>Could not find address in the dht</strong>. Your machine
              is either not connected to the IPFS Public DHT (even as a client),
              or is not advertising the address that you are testing with. As a
              result no one will be able to contact you on that address if they
              only learn about your peerID, as is the case for content
              advertised in the IPFS Public DHT
            </li>
            <li className="">
              <strong>Multihash not advertised in the dht</strong>. Your machine
              has not advertised that it has the given content in the IPFS
              Public DHT. This means that other machines will have to discover
              that you have the content in some other way (e.g. pre-connecting
              to you optimistically, pre-connecting to you since related content
              is already advertised by you, some rendezvous service, being on
              the same LAN, etc.). If using go-ipfs consider enabling the
              <a href="https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#accelerated-dht-client">
                Accelerated DHT Client
              </a>
              , which will advertise content faster and in particular should
              enable you to continue to republish your advertisements every
              24hrs as required by the network.
            </li>
            <li className="">
              <strong>Peer has not responded that it has the CID</strong>. Your
              node does not think it has the data you think it does, or it took
              too long to respond. Until this is resolved other machines will be
              unable to download that content from you.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};
