import * as React from "react";
import * as Types from "../../Types";
import GameContainer from "./GameComponents/GameContainer";
import LoginPage from "./Login";
import NewUser from "./NewUser";
import { Routes, Route } from "react-router-dom";

const App = (props: Types.AppProps) => {
  return (
    <main className="container-fluid px-5 my-3">
      <div className="text-center">Title Here</div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/game" element={<GameContainer />} />
        <Route path="/register" element={<NewUser />} />
      </Routes>
    </main>
  );
};

export default App;
