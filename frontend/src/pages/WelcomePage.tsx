import { ExternalLink } from "components/ExternalLink";
import { GITHUB_URL } from "data/github";
import { Link } from "react-router-dom";

export const WelcomePage: React.FC = () => {
  return (
    <>
      <div className="pb-4" style={{ minHeight: "90vh" }}>
        <section className="hero is-medium is-link">
          <div className="hero-body">
            <p className="title">PL Diagnose</p>
            <p className="subtitle">
              Diagnose issues with the IPFS, IPLD, and libp2p Stack.
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="tile is-ancestor">
              <div className="tile is-parent is-4">
                <div className="tile is-child box">
                  <h2 className="title is-3">IPFS Content Diagnostic</h2>
                  <p>I can't access my IPFS content</p>
                  <Link to="/diagnose/access-content">Diagnose</Link>
                </div>
              </div>
              <div className="tile is-parent is-4">
                <div className="is-child box">
                  <h2 className="title is-3">Other Diagnostic Tools</h2>
                  <p>I am looking for more tools</p>
                  <Link to="/toolbox">More Tools</Link>
                </div>
              </div>
              <div className="tile is-parent is-4">
                <div className="is-child box">
                  <h2 className="title is-3">Contribute on Github</h2>
                  <ExternalLink href={GITHUB_URL!} title="Go to /pl-diagnose" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
