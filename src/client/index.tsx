import * as React from "react";
import { render } from "react-dom";
import App from "./App";
import "./scss/app";
import { configureStoreAsync } from "./Redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AnyAction, Store } from "@reduxjs/toolkit";
import { PLAYER_DATA_KEY } from "./ClientUtils/Fetcher";

configureStoreAsync().then((store) => {
  // sub to the store on all changes and pass them into our utility
  //@ts-ignore
  store.subscribe(async () => {
    //@ts-ignore
    localStorage.setItem(PLAYER_DATA_KEY, JSON.stringify(store.getState()));
  });

  render(
    //@ts-ignore
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
});
