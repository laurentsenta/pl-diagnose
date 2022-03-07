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
              Diagnose issues with the IPFS / libp2p Stack.
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="tile is-ancestor">
              <div className="tile is-parent is-4">
                <div className="tile is-child box">
                  <h2 className="title is-3">I can't access my IPFS content</h2>
                  <Link to="/diagnose/access-content">Go here.</Link>
                </div>
              </div>
              <div className="tile is-parent is-4">
                <div className="is-child box">
                  <h2 className="title is-3">I am looking for more tools</h2>
                  <Link to="/toolbox">Go here.</Link>
                </div>
              </div>
              <div className="tile is-parent is-4">
                <div className="is-child box">
                  <h2 className="title is-3">Contribute on Github</h2>
                  <ExternalLink href={GITHUB_URL!} title="Go here." />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
