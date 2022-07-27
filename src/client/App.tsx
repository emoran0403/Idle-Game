import * as React from "react";
import * as Types from "../../Types";
import GameContainer from "./GameComponents/GameContainer";
import LoginPage from "./Login";
import NewUser from "./NewUser";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Lobby from "./Lobby";

const App = (props: Types.AppProps) => {
  const nav = useNavigate();

  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [showLobbyButton, setShowLobbyButton] = useState<boolean>(false);

  const handeLogOut = () => {
    //! this needs to handle a PUT req to the db to update player data
    console.log(`logging out`);
    setLoggedIn(!loggedIn);
    setShowLobbyButton(false);
    nav(`/`);
  };

  const handleMoveToLobby = () => {
    // move the player to the game
    nav(`/lobby`);
    // toggle state for the lobby button
    setShowLobbyButton(false);
  };

  return (
    <main className="container-fluid px-5 mt-3">
      <div className="text-center">Title Here</div>

      {loggedIn && (
        <div className="d-flex justify-content-end mb-1">
          {showLobbyButton && (
            <button onClick={() => handleMoveToLobby()} className="btn btn-primary">
              Lobby
            </button>
          )}

          <button onClick={() => handeLogOut()} className="btn btn-primary">
            Log Out
          </button>
        </div>
      )}

      <Routes>
        <Route path="/" element={<LoginPage setLoggedIn={setLoggedIn} loggedIn={loggedIn} />} />
        <Route path="/lobby" element={<Lobby setShowLobbyButton={setShowLobbyButton} />} />
        <Route path="/game" element={<GameContainer setShowLobbyButton={setShowLobbyButton} />} />
        <Route path="/register" element={<NewUser setLoggedIn={setLoggedIn} loggedIn={loggedIn} />} />
      </Routes>
    </main>
  );
};

export default App;
