import React, { useState } from "react";
import * as Types from "../../Types";
import { useNavigate } from "react-router-dom";
import Fetcher, { TOKEN_KEY } from "../client/ClientUtils/Fetcher";

const Loginpage = () => {
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

    //! i want this to accept username instead of an email
    // Fetcher.POST("/auth/login", { username, password })
    //! this will need to set data from db into global redux state

    //   .then((data) => {
    //     // console.log({ data });
    //     if (data.token) {
    //       localStorage.setItem(TOKEN_KEY, data.token);
    //       nav(`/game`);
    //     } else {
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
