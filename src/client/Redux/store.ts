import { configureStore } from "@reduxjs/toolkit";
import Fetcher, { PLAYER_DATA_KEY } from "../ClientUtils/Fetcher";
import rootReducer from "./Reducers";
import * as Types from "../../../Types";

// we make our own Promise function that will configure the store after an api call
// we use the preloadedState property to "hydrate" the store
// you'd need to error handle if there is no good response

//@ function to set the most recent data to state, whether it comes from local storage or from Mongo
export const configureStoreAsync = () => {
  return new Promise((resolve, reject) => {
    // grab the player's data from local storage
    let playerDataFromLocalStorage = localStorage.getItem(PLAYER_DATA_KEY);

    // if it exists, use it
    if (playerDataFromLocalStorage) {
      let goodData = JSON.parse(playerDataFromLocalStorage) as Types.IPlayerData;
      let store = configureStore({
        reducer: rootReducer,
        preloadedState: goodData,
      });
      resolve(store);
    }

    // otherwise, get it from the database
    Fetcher.GET("/api/getplayerinfo")
      .then((preloadedState) => {
        delete preloadedState._id;
        delete preloadedState.timestamp;
        delete preloadedState.username;
        delete preloadedState.email;
        // console.log({ stateIS: preloadedState });
        // if there is a token in local storage, load with the player's saved data
        let store = configureStore({
          reducer: rootReducer,
          preloadedState,
        });
        console.log(`get player info worked and resolving with the store`);
        resolve(store);
      })
      .catch((error) => {
        console.log(`Could not get the player info error here:`);
        console.log(error);
        // if there is a no token in local storage, load with the default data
        let store = configureStore({
          reducer: rootReducer,
        });
        resolve(store);
      });
  });
};

//@ utility function to save state asynchronously to Mongo
//@ts-ignore
export const saveState = (state) => {
  // console.log(`look below for the save state`);
  // console.log({ state });
  return new Promise((resolve, reject) => {
    Fetcher.PUT("/api/updateplayerinfo", state)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
