import * as Types from "../../Types";
import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Validation from "./ClientUtils/DataValidation";
import Fetcher, { TOKEN_KEY } from "../client/ClientUtils/Fetcher";

const NewUser = (props: Types.NewUserCompProps) => {
  const [password_A, setPassword_A] = useState<string>("hunter2222");
  const [password_B, setPassword_B] = useState<string>("hunter2222");
  const [email, setEmail] = useState<string>(`${Date.now()}@test.com`);
  const [username, setUsername] = useState<string>(`${Date.now()}`);

  const nav = useNavigate();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    //@ check if the user entered valid email
    Validation.isValidEmail(email)
      .then(() => {
        //@ then check if the user entered an acceptable username
        return Validation.isValidusername(username);
      })
      .then(() => {
        //@ then check if the user entered the password they meant to enter
        if (password_A !== password_B) {
          setPassword_A("");
          setPassword_B("");
          throw new Error(`passwords do not match`);
        }

        //@ then check for password length
        if (password_A.length < 8) {
          setPassword_A("");
          setPassword_B("");
          throw new Error(`passwords must be more than 8 characters long`);
        }
      })
      .then(() => {
        Fetcher.POST("/auth/register", { username, email, password: password_A })
          .then((res) => {
            // console.log({ data });
            props.setLoggedIn(true);
            localStorage.setItem(TOKEN_KEY, res);
            nav(`/lobby`);
          })
          .catch((error) => {
            console.log(`Login Error...\n`);
            console.error(error);
            alert(`Something went wrong, please try again: ${error.message}`);
          });
      })
      .catch((error) => {
        console.log(error);
        alert("Please check your inputs");
        return;
      });
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
