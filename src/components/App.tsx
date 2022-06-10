import * as React from "react";
import { AppCtxProvider } from "../context";
import "./../assets/scss/App.scss";
import { ConfigPane } from "./ConfigPane";
import { DrawBoard } from "./DrawBoard";

const reactLogo = require("./../assets/img/react_logo.svg");

const App = () => (
  <div className="app">
    <AppCtxProvider >
      <DrawBoard />
      <ConfigPane />
    </AppCtxProvider>
  </div>
);

export default App;
