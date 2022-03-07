package main

import (
	"context"

	"github.com/libp2p/go-libp2p-core/routing"

	nrouting "github.com/ipfs/go-ipfs-routing/none"
)

var nilRouter routing.Routing

func init() {
	nr, err := nrouting.ConstructNilRouting(context.TODO(), nil, nil, nil)
	if err != nil {
		panic(err)
	}
	nilRouter = nr
}
