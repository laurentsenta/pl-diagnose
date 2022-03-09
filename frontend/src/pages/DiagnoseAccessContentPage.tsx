/* eslint-disable jsx-a11y/anchor-is-valid */
import { ButtonWithModal } from "components/ButtonWithModal";
import { AddrField, BackendURLField, CIDField } from "components/CommonFields";
import { ExternalLink } from "components/ExternalLink";
import { IsMyContentAvailableInline } from "components/IsMyContentAvailableInline";
import { IsMyNodeAccessibleInline } from "components/IsMyNodeAccessibleInline";
import { IsMyNodeOnTheDHTInline } from "components/IsMyNodeOnTheDHTInline";
import { IsMyNodeServingContentInline } from "components/IsMyNodeServingContentInline";
import last from "lodash-es/last";
import { useCallback, useEffect, useRef, useState } from "react";

const WhereDoIFindMyMultiaddress: React.FC = () => {
  return (
    <ButtonWithModal title="Where do I find my multiaddr?">
      <section className="content">
        <h2 className="">Where do I find my multiaddr?</h2>
        <ul>
          <li className="">
            <strong>Using This tool</strong>
            <ul>
              <li>
                Run the "Is my content on the DHT?" test and click on any of the
                provider's addresses
              </li>
              <li>
                Run the "Is my node accessible?" test and click on any of the
                node advertised addresses
              </li>
            </ul>
            <strong>Using IPFS Desktop or IPFS WebUI</strong>
            <ul>
              <li>
                Open the IPFS WebUI "Status" page via the IPFS Desktop menu or
                by visiting{" "}
                <ExternalLink
                  href="http://127.0.0.1:5001/webui"
                  title="http://127.0.0.1:5001/webui"
                />{" "}
                (when using the default config settings)
              </li>
              <li>
                If you want to test your peerID rather than a particular address
                enter{" "}
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
                If you want to test your peerID rather than a particular address
                run <code>ipfs id</code> and enter{" "}
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
      </section>
    </ButtonWithModal>
  );
};

const Content: React.FC<{
  setRef: (id: number, e: HTMLElement | null) => void;
}> = ({ setRef }) => {
  return (
    <>
      <section className="hero">
        <div className="hero-body">
          <h1 className="title is-size-1">I can't access my content</h1>
          <h2 className="subtitle">
            Diagnose issues with your libp2p / ipfs stack.
          </h2>
          <p className="content">
            This tool will help you diagnose why you cannot access content via
            the IPFS network.
          </p>
        </div>
        <div className="content">
          <p>
            <strong>What These Tools Can Check</strong>
          </p>
          <ol>
            <li>
              Is a given piece of content, identified with a with a certain{" "}
              <a href="http://docs.ipfs.io.ipns.localhost:8080/concepts/content-addressing/">
                CID
              </a>{" "}
              available on the IPFS network?
            </li>
            <li>
              Which{" "}
              <a href="http://docs.ipfs.io.ipns.localhost:8080/concepts/glossary/#peer-id">
                PeerIds
              </a>{" "}
              does the{" "}
              <a href="http://docs.ipfs.io.ipns.localhost:8080/concepts/dht/#distributed-hash-tables-dhts">
                DHT
              </a>{" "}
              list as hosts, and which network addresses or{" "}
              <a href="http://multiformats.io.ipns.localhost:8080/multiaddr/">
                Multiaddresses
              </a>{" "}
              are listed in the DHT for a given IPFS Node
            </li>
            <li>Is an IPFS node accessible by other peers</li>
            <li>Is certain content available from an IPFS node</li>
          </ol>
        </div>
        <div className="" style={{ maxWidth: "600px" }}>
          <BackendURLField />
        </div>
      </section>
      <section className="section">
        <TitleWithRef className="title is-3" id={1} setRef={setRef}>
          1. Is my content on the DHT?
        </TitleWithRef>
        <div className="content">
          <p>
            Before retrieving a piece of content, we need to make sure it is
            accessible on the DHT.
          </p>
          <p>
            <strong>What is this?</strong>
          </p>
          <p>
            Enter your content's CID below. On submit, the backend server will
            request the DHT and try to find your content. Hopefully the backend
            will find some peers advertising your content.
          </p>
        </div>
        <div className="" style={{ maxWidth: "600px" }}>
          <CIDField />
        </div>
        <div className="block">
          <IsMyContentAvailableInline />
        </div>
      </section>
      <section className="section">
        <TitleWithRef className="title is-3" id={2} setRef={setRef}>
          2. Is my node in the DHT?
        </TitleWithRef>
        <div className="content">
          <p>TBD</p>
          <p>
            <strong>What is this?</strong>
          </p>
          <p>TBD.</p>
          <p>
            Enter your node's p2p address below. On submit, the backend server
            will try to find your node in the DHT.
          </p>
          <WhereDoIFindMyMultiaddress />
        </div>
        <div className="" style={{ maxWidth: "600px" }}>
          <AddrField />
        </div>
        <div className="block">
          <IsMyNodeOnTheDHTInline />
        </div>
      </section>
      <section className="section">
        <TitleWithRef className="title is-3" id={3} setRef={setRef}>
          3. Is my node accessible?
        </TitleWithRef>
        <div className="content">
          <p>
            If a node is advertising your content on the DHT we need to make
            sure it is possible to connect to it.
          </p>
          <p>
            <strong>What is this?</strong>
          </p>
          <p>TBD.</p>
          <p>
            Enter your node's address below. On submit, the backend server will
            try to connect and identify the node.
          </p>
          <WhereDoIFindMyMultiaddress />
        </div>
        <div className="" style={{ maxWidth: "600px" }}>
          <AddrField />
        </div>
        <div className="block">
          <IsMyNodeAccessibleInline />
        </div>
      </section>
      <section className="section">
        <TitleWithRef className="title is-3" id={4} setRef={setRef}>
          4. Is my node serving the content?
        </TitleWithRef>
        <div className="content">
          <p>
            If you're node is accessible and the content is advertised on the
            DHT, let's check that your node is actually serving the content.
          </p>
          <p>
            Click below to have the backend try to retrieve data from your node.
          </p>
        </div>
        <div className="block">
          <IsMyNodeServingContentInline />
        </div>
      </section>
    </>
  );
};

export const DiagnoseAccessContentPage: React.FC = () => {
  const [refs, setRefs] = useState<(HTMLElement | null)[]>([]);

  const setRef = useCallback(
    (id: number, e: HTMLElement | null) => {
      setRefs((x) => {
        const next = [...x];
        next[id] = e;
        return next;
      });
    },
    [setRefs]
  );

  const scrollY = useScrollPosition();

  const latestPassedRef = last(
    refs
      .map((x, index) => ({ x, index }))
      .filter(({ x, index }) => {
        if (!x) {
          return false;
        }

        return scrollY > x.offsetTop - 100;
      })
  );

  const activeIndex = latestPassedRef ? latestPassedRef.index : undefined;

  return (
    <div className="columns">
      <div className="column is-2 sticky-sidebar has-background-white-bis">
        <aside className="menu">
          <p className="menu-label">Diagnose</p>
          <ul className="menu-list">
            {refs.map((r, index) => {
              const isActive = index === activeIndex;
              const onClick = () => r?.scrollIntoView();

              return (
                <li key={index}>
                  <a
                    onClick={onClick}
                    className={`${isActive ? "is-active" : ""}`}
                  >
                    {r?.textContent}
                  </a>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
      <div className="column is-6 is-offset-1 py-5">
        <Content setRef={setRef} />
      </div>
    </div>
  );
};

const useScrollPosition = () => {
  const [y, setY] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setY(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return y;
};

const TitleWithRef: React.FC<{
  setRef: (id: number, e: HTMLElement | null) => void;
  id: number;
  className: string;
}> = ({ setRef, id, children, ...props }) => {
  const cb = useCallback(
    (e: HTMLElement | null) => {
      setRef(id, e);
    },
    [setRef, id]
  );

  return (
    <h1 ref={cb} {...props}>
      {children}
    </h1>
  );
};
