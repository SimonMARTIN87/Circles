import * as React from "react";
import { AppCtxProvider } from "../context";
import "./../assets/scss/App.scss";
import { ConfigPane } from "./ConfigPane";
import { HTMLBoard } from "./HTMLBoard";

const reactLogo = require("./../assets/img/react_logo.svg");

const App = () => (
  <div className="app">
    <AppCtxProvider >
      <HTMLBoard />
      <ConfigPane />
    </AppCtxProvider>
  </div>
);

export default App;
