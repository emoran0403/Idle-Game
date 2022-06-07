import * as React from "react";
import { render } from "react-dom";
import App from "./App";
import "./scss/app";
import store from "./Redux/store";
import { Provider } from "react-redux";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
