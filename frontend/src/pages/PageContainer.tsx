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
            <a href="https://github.com/laurentsenta/pl-ipfs-check">Github</a>.
          </p>
        </div>
      </footer>
    </>
  );
};
