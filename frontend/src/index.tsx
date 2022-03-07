import { CommonParamsProvider } from "data/useCommonParams";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { HashRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./style.scss";

export const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <CommonParamsProvider>
          <App />
        </CommonParamsProvider>
      </HashRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
