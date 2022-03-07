import { ExternalLink } from "components/ExternalLink";
import { GITHUB_URL } from "data/github";
import { Outlet } from "react-router-dom";

export const PageContainer: React.FC = ({ children }) => {
  return (
    <>
      <div className="main">
        <Outlet />
      </div>
      <footer className="footer pt-4">
        <div className="content has-text-centered">
          <p>
            <strong>PL Diagnose</strong>
            <br />
            <ExternalLink href={GITHUB_URL!} title="Github" />.
          </p>
        </div>
      </footer>
    </>
  );
};
