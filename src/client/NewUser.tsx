import * as Types from "../../Types";
import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Validation from "./ClientUtils/DataValidation";
import Fetcher, { TOKEN_KEY } from "../client/ClientUtils/Fetcher";

const NewUser = (props: Types.NewUserCompProps) => {
  const [password_A, setPassword_A] = useState<string>("");
  const [password_B, setPassword_B] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const nav = useNavigate();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    //@ check if the user entered the password they meant to enter
    if (password_A !== password_B) {
      alert("Passwords do not match");
      setPassword_A("");
      setPassword_B("");
      return;
    }

    //@ check if the user entered valid email
    Validation.isValidEmail(email)
      .then(() => console.log(`Email validated.`))
      .catch((error) => {
        console.log(`Bad Email Check Error...\n`);
        console.error(error);
        alert("Please enter a valid email");
        return;
      });

    //@ check if the user entered an acceptable username
    Validation.isValidusername(username)
      .then(() => console.log(`Username validated.`))
      .catch((error) => {
        console.log(`Bad Username Check Error...\n`);
        console.log(error);
        alert("Please enter a username containing only letters, numbers, and spaces");
        return;
      });

    //! this is for testing purposes
    nav(`/game`);

    //@ toggle the logged in boolean to properly display the logout button
    props.setLoggedIn(!props.loggedIn);

    //! need to check if email or usernames are duplicates
    // check if email or usernames are duplicates here

    // Fetcher.POST("/auth/login", { email, password_A })
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

  //   useEffect(() => {}, []);
  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="card bg-light shadow col-md-4">
          <div className="card-body d-flex flex-wrap justify-content-center">
            <h5 className="card-title text-center col-md-7">Choose a Username, and enter your email and a password</h5>

            <input
              id="username"
              placeholder="username"
              type="text"
              value={username}
              className="form-control col-md-7 my-1"
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              id="email"
              placeholder="email"
              type="email"
              value={email}
              className="form-control col-md-7 mb-1"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              id="password_A"
              placeholder="password"
              type="password"
              value={password_A}
              className="form-control col-md-7 mb-1"
              onChange={(e) => setPassword_A(e.target.value)}
            />

            <input
              id="password_B"
              placeholder="confirm password"
              type="password"
              value={password_B}
              className="form-control col-md-7 mb-1"
              onChange={(e) => setPassword_B(e.target.value)}
            />

            <button className="btn btn-primary my-2 ms-2 col-md-6" type="button" onClick={(e) => handleLogin(e)}>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewUser;
