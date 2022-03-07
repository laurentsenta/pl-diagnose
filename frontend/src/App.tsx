import { DiagnoseAccessContentPage } from "pages/DiagnoseAccessContentPage";
import { PageContainer } from "pages/PageContainer";
import { ToolboxPage } from "pages/ToolboxPage";
import { WelcomePage } from "pages/WelcomePage";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";

const PageHeader: React.FC = () => {
  return (
    <div className="navbar">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          PL Diagnose
        </Link>
        <a
          href="#"
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className="navbar-start">
        <Link className="navbar-item" to="/diagnose/access-content">
          Access Content
        </Link>
        <Link className="navbar-item" to="/toolbox">
          Toolbox
        </Link>
      </div>
    </div>
  );
};

const NotFound: React.FC = () => {
  return <div>Not Found</div>;
};

function App() {
  return (
    <div className="App">
      <PageHeader />
      <Routes>
        <Route path="/" element={<PageContainer />}>
          <Route index element={<WelcomePage />} />
          {/* <Route index element={<IPFSCheckPage />} /> */}
          <Route path="/toolbox" element={<ToolboxPage />} />
          <Route
            path="/diagnose/access-content"
            element={<DiagnoseAccessContentPage />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
