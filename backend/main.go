package main

import (
	"encoding/json"
	"fmt"
	"net"
	"net/http"
)

func main() {
	// // start a libp2p node with default settings
	// node, err := libp2p.New(
	// 	libp2p.ConnectionGater(&privateAddrFilterConnectionGater{}),
	// )
	// if err != nil {
	// 	panic(err)
	// }

	// // Identify service
	// daemon := &daemon{host: node}
	daemon := &daemon{}

	// Server
	l, err := net.Listen("tcp", ":3333")
	if err != nil {
		panic(err)
	}

	fmt.Printf("listening on %v\n", l.Addr())

	http.HandleFunc("/identify", func(writer http.ResponseWriter, request *http.Request) {
		out, err := daemon.runIdentify(request.Context(), request.RequestURI)
		outputJSONOrErr(writer, out, err)
	})

	http.HandleFunc("/find", func(writer http.ResponseWriter, request *http.Request) {
		out, err := daemon.runFindContent(request.Context(), request.RequestURI)
		outputJSONOrErr(writer, out, err)
	})

	http.HandleFunc("/bitswap", func(writer http.ResponseWriter, request *http.Request) {
		out, err := daemon.runAccessBitswap(request.Context(), request.RequestURI)
		outputJSONOrErr(writer, out, err)
	})

	fmt.Println("Ready to start serving")
	err = http.Serve(l, nil)
	if err != nil {
		panic(err)
	}
}

func outputJSONOrErr(writer http.ResponseWriter, out interface{}, err error) {
	writer.Header().Add("Access-Control-Allow-Origin", "*")

	if err != nil {
		writer.WriteHeader(http.StatusInternalServerError)
		_, _ = writer.Write([]byte(err.Error()))
		return
	}

	outputJSON, err := json.Marshal(out)

	if err != nil {
		writer.WriteHeader(http.StatusInternalServerError)
		_, _ = writer.Write([]byte(err.Error()))
		return
	}

	_, err = writer.Write(outputJSON)

	if err != nil {
		fmt.Printf("could not return data over HTTP: %v\n", err.Error())
	}
}
