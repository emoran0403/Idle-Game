import React, { useState } from "react";
import * as Types from "../../Types";
import { useNavigate } from "react-router-dom";
import Fetcher, { TOKEN_KEY } from "../client/ClientUtils/Fetcher";

const Loginpage = (props: Types.LoginCompProps) => {
  const nav = useNavigate();

  //! swap for production
  //@=============================================================================
  // const [password, setPassword] = useState<string>("");
  // const [username, setUsername] = useState<string>("");
  //@======PRODUCTION ABOVE, DEV BELOW============================================
  const [password, setPassword] = useState<string>("1111111111");
  const [username, setUsername] = useState<string>("bigwow");
  //@=============================================================================

  const handleLogin = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();

    //@ check if the user has entered their username and password
    if (!password || !username) {
      alert(`Please enter your username and password`);
      return;
    }

    //! this is for testing purposes
    // nav(`/lobby`); // navigate user to the lobby component
    // props.setLoggedIn(!props.loggedIn); // toggle the login state to allow the logout button to be displayed

    //@ check if the user is a valid user, and if so, set the proper data to state, and move them to the lobby
    Fetcher.POST("/auth/login", { username, password })
      .then((data) => {
        // console.log({ data });
        console.log(`trying to login!`);

        // if the player can log in
        if (data.token) {
          //@ toggle the logged in boolean to properly display the logout button
          props.setLoggedIn(!props.loggedIn);

          // put the JWT into local storage
          localStorage.setItem(TOKEN_KEY, data.token);

          // finally navigate the player to the lobby
          nav(`/lobby`);
        }
      })
      .catch((error) => {
        console.log(`Login Error...\n`);
        console.error(error);
        alert(error.message);
      });
  };

  const handleEnterLogin = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="card bg-light shadow col-md-4">
          <form className="card-body d-flex flex-wrap justify-content-center">
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
              onKeyDown={(e) => handleEnterLogin(e)}
            />

            <button className="btn btn-primary my-2 ms-2 col-md-6" type="button" onClick={(e) => handleLogin(e)}>
              Login
            </button>

            <button className="btn btn-primary my-2 ms-2 col-md-6" type="button" onClick={() => nav(`/register`)}>
              New Player
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
