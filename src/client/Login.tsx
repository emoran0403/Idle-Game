import React, { useState } from "react";
import * as Types from "../../Types";
import { useNavigate } from "react-router-dom";
import Fetcher, { TOKEN_KEY } from "../client/ClientUtils/Fetcher";

const Loginpage = (props: Types.LoginCompProps) => {
  const nav = useNavigate();

  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    //@ check if the user has entered their username and password
    if (!password || !username) {
      alert(`Please enter your username and password`);
      return;
    }

    //! this is for testing purposes
    nav(`/game`);

    //@ toggle the logged in boolean to properly display the logout button
    props.setLoggedIn(!props.loggedIn);

    //@ check if the user is a valid user, and if so, set the proper data to state, and move them to the game
    // Fetcher.POST("/auth/login", { username, password })
    //   .then((data) => {
    //     // console.log({ data });

    //     // if the player can log in
    //     if (data.token) {
    //       // put the JWT into local storage
    //       localStorage.setItem(TOKEN_KEY, data.token);

    //       // grab the previous checkPointData from localStorage
    //       const checkPointData = localStorage.getItem(`checkPointData`);

    //       // if there is checkPointData, compare the timestamp to the DB timestamp
    //       if (checkPointData) {
    //         //! compare timestamps here
    //         //! set the data with the larger timestamp to state
    //       } else {
    //         //! if there is no checkPointData, set data from DB to state
    //       }

    //       // finally navigate the player to the game
    //       nav(`/game`);
    //     } else {
    //       // otherwise, the player cannot login, so alert the user to the problem
    //       alert(data.message);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(`Login Error...\n`);
    //     console.error(error);
    //     alert(`Something went wrong, please try again`);
    //   });
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="card bg-light shadow col-md-4">
          <div className="card-body d-flex flex-wrap justify-content-center">
            <h5 className="card-title text-center col-md-7">Please log in, or click the new player button</h5>

            <input
              id="username"
              placeholder="username"
              type="text"
              value={username}
              className="form-control col-md-7 mt-1"
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              id="password"
              placeholder="password"
              type="password"
              value={password}
              className="form-control col-md-7 mb-1"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-primary my-2 ms-2 col-md-6" type="button" onClick={(e) => handleLogin(e)}>
              Login
            </button>

            <button className="btn btn-primary my-2 ms-2 col-md-6" type="button" onClick={() => nav(`/register`)}>
              New Player
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
