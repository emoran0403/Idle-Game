import * as Types from "../../Types";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//@ This component is displayed after the player logs in.
//@ Tutorial info and updates to the game will be shown while the server hydrates the player information.
const Lobby = (props: Types.LobbyProps) => {
  const nav = useNavigate();

  // useEffect(() => {}, []);
  const handleMoveToGame = () => {
    // move the player to the game
    nav(`/game`);
    // toggle state for the lobby button
    props.setShowLobbyButton(true);
  };

  return (
    <div className="border border-dark border-2 rounded-3">
      <button className="btn btn-primary" onClick={() => handleMoveToGame()}>
        Play Now
      </button>
    </div>
  );
};

export default Lobby;
