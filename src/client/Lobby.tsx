import * as Types from "../../Types";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//@ This component is displayed after the player logs in.
//@ Tutorial info and updates to the game will be shown while the server hydrates the player information.
const Lobby = (props: Types.NoProps) => {
  const nav = useNavigate();

  // useEffect(() => {}, []);

  return (
    <div className="border border-dark border-2 rounded-3">
      <button className="btn btn-primary" onClick={() => nav(`/game`)}>
        Play Now
      </button>
    </div>
  );
};

export default Lobby;
