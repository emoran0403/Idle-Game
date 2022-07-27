import * as React from "react";
import { render } from "react-dom";
import App from "./App";
import "./scss/app";
import store, { persistedStore } from "./Redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistedStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
