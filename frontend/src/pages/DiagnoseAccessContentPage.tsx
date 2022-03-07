/* eslint-disable jsx-a11y/anchor-is-valid */
import { ButtonWithModal } from "components/ButtonWithModal";
import { AddrField, BackendURLField, CIDField } from "components/CommonFields";
import { IsMyContentAvailableInline } from "components/IsMyContentAvailableInline";
import { IsMyNodeAccessibleInline } from "components/IsMyNodeAccessibleInline";
import { IsMyNodeServingContentInline } from "components/IsMyNodeServingContentInline";
import last from "lodash-es/last";
import { useCallback, useEffect, useRef, useState } from "react";

const Content: React.FC<{
  setRef: (id: number, e: HTMLElement | null) => void;
}> = ({ setRef }) => {
  return (
    <>
      <section className="hero">
        <div className="hero-body">
          <h1 className="title is-size-1">I can't access my content</h1>
          <p className="subtitle">
            Diagnose issues with your libp2p / ipfs stack.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="content">
          Ok, you cannot access your content, sorry about that. Let's try to
          find out why.
        </div>
      </section>
      <section className="section">
        <div className="content">
          <p>
            First, let's configure the node we are going to use to test
            accessibility. To be described. Don't worry much about this.
          </p>
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
            First we need to make sure your content is accessible on the DHT.
            (ref needed). So starting from the backend server we are going to
            request the DHT and make sure your content can be discovered.
          </p>
          <p>
            Enter your content's CID below, hopefully the backend will find some
            peers advertising this content.
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
          2. Is my node accessible?
        </TitleWithRef>
        <div className="content">
          <p>
            Now we need to make sure that nodes serving your content can be
            reached.
          </p>
          <p>
            Enter your node's address below, hopefully the backend will be able
            to reach out to it.
          </p>
          <ButtonWithModal title="Where do I find my multiaddr?">
            <section className="content">
              <h2 className="">Where do I find my multiaddr?</h2>
              <ul>
                <li className="">
                  <strong>Using This tool</strong>
                  <ul>
                    <li>
                      Run the "Is my content on the DHT?" test and click on any
                      of the provider's addresses
                    </li>
                    <li>
                      Run the "Is my node accessible?" test and click on any of
                      the node advertised addresses
                    </li>
                  </ul>
                  <strong>Using IPFS Desktop or IPFS WebUI</strong>
                  <ul>
                    <li>
                      Open the IPFS WebUI "Status" page via the IPFS Desktop
                      menu or by visiting "http://127.0.0.1:5001/webui" (when
                      using the default config settings)
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
                      If you want to test a particular address then choose an
                      entry from the list of addresses output by{" "}
                      <code>ipfs id</code>
                    </li>
                  </ul>
                </li>
              </ul>
            </section>
          </ButtonWithModal>
        </div>
        <div className="" style={{ maxWidth: "600px" }}>
          <AddrField />
        </div>
        <div className="block">
          <IsMyNodeAccessibleInline />
        </div>
      </section>
      <section className="section">
        <TitleWithRef className="title is-3" id={3} setRef={setRef}>
          3. Is my node serving the content?
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
