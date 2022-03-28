import { ExternalLink } from "components/ExternalLink";
import { makeIssueURL } from "data/github";

export const ToolboxPage: React.FC = () => {
  return (
    <>
      <div className="container pt-4 pb-4">
        <h1 className="title">More Tools</h1>
        <div className="content">
          <h3>DHT Crawling</h3>
          <ul>
            <li>
              <ExternalLink
                href="https://github.com/whyrusleeping/ipfs-counter"
                title="whyrusleeping/ipfs-counter"
              />
            </li>
            <li>
              <ExternalLink
                href="https://github.com/raulk/dht-hawk"
                title="raulk/dht-hawk"
              />
            </li>
            <li>
              <ExternalLink
                href="https://github.com/vyzo/ipfs-crawl"
                title="vyzo/ipfs-crawl"
              />
            </li>
          </ul>
          <h3>IPFS Issues</h3>
          <ul>
            <li>
              <ExternalLink
                href="https://github.com/aschmahmann/ipfs-ds"
                title="aschmahmann/ipfs-ds"
              />
            </li>
            <li>
              <ExternalLink
                href="https://github.com/aschmahmann/vole"
                title="aschmahmann/vole"
              />
            </li>
            <li>
              <ExternalLink
                href="https://github.com/aschmahmann/ipfs-check"
                title="aschmahmann/ipfs-check"
              />
            </li>
            <li>
              <ExternalLink
                href="https://github.com/whyrusleeping/ipfs-see-all"
                title="whyrusleeping/ipfs-see-all"
              />
            </li>
            <li>
              <ExternalLink
                href="https://github.com/whyrusleeping/repofix"
                title="whyrusleeping/repofix"
              />
            </li>
            <li>
              <ExternalLink
                href="https://github.com/achingbrain/ipfs-unixfs-cli"
                title="achingbrain/ipfs-unixfs-cli"
              />
            </li>
          </ul>
          <h3>libp2p</h3>
          <ul>
            <li>
              <ExternalLink
                href="https://github.com/mxinden/libp2p-lookup"
                title="mxinden/libp2p-lookup"
              />
            </li>
          </ul>
          <h3>Misc</h3>
          <ul>
            <li>
              <ExternalLink
                href="https://github.com/notassigned/p2p-tools"
                title="notassigned/p2p-tools"
              />
            </li>
            <li>
              <ExternalLink
                href="https://github.com/sebastiendan/ipfs-perfs"
                title="sebastiendan/ipfs-perfs"
              />
            </li>
            <li>
              <ExternalLink
                href="https://github.com/mrd0ll4r/ipfs-tools"
                title="mrd0ll4r/ipfs-tools"
              />
            </li>
            <li>
              <ExternalLink
                href="https://cid.contact/"
                title="CID Contact - An Interplanetary Network Index"
              />
            </li>
          </ul>
        </div>
        <div
          className="box has-text-centered"
          style={{ maxWidth: "600px", margin: "auto" }}
        >
          <p>
            <strong>Help us improve this site!</strong>
            <br />
            <ExternalLink
              href={makeIssueURL({ title: "[toolbox] add my content" })}
              title="Suggest New Content"
            />
          </p>
        </div>
      </div>
    </>
  );
};
