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
    <div className="border border-dark shadow border-2 rounded-3">
      <div>
        <p className="text-center">Welcome to the game!</p>
        <p>
          This is an idle game based on the MMORPG Runescape. An idle game, also known as an incremental game, is a genre of games defined by the primary
          feature of its strategy: leaving the game running by itself with minimum or zero player interaction. Interaction with the game, while often useful for
          progression, is optional for extended periods of gameplay.
        </p>
        <p>
          The game currently features skills, quests, and combat found in Lumbridge, the starting area of Runescape. This game will 'tick' every 2 seconds,
          resolving the action chosen by the player. Every game tick will update the state of the game, which will subsequently save the player data to
          localstorage. Every 5 minutes, player data is saved to the database. Upon loading the app, player data will be loaded from localStorage, or the
          database if localStorage is empty.
        </p>
        <div className="d-flex flex-row justify-content-center">
          <div className="card">
            <div>
              <img src="/Assets/ActivityButtons.PNG" className="card-img-top " width="326" height="149" />
            </div>
          </div>
        </div>
        <div className="d-flex flex-row">
          <div className="card col-4">
            <div className="card-body">
              <h5 className="card-title text-center">Skilling</h5>
              <p className="card-text">Skilling is where the player gathers or creates certain items.</p>

              <p className="card-text">
                To begin skilling, click the skills activity button. Options in green are accesssible, and those in red require a higher level in the respective
                skill.
              </p>

              <ul>
                <li className="card-text">
                  Training Woodcutting requires a hatchet (more powerful hatchets can be bought in the store - store activity button). Select the hatchet you
                  wish to use, then click on the type of logs you wish to cut.
                </li>
                <li className="card-text">Training Fishing does not require any type of special equipment, simply click on the fish you wish to catch</li>
              </ul>
              <p className="card-text">
                As you accumulate resources your inventory will fill up (the box at the top right of the screen). Items will automatically be deposited into the
                bank when your inventory is full. You can view your bank by clicking the bank activity button.
              </p>
            </div>
          </div>
          <div className="card col-4">
            <div className="card-body">
              <h5 className="card-title text-center">Quests</h5>
              <p className="card-text">
                If the player has chosen a quest, progress will accumulate until the quest is complete, and any rewards will be given out.
              </p>
              <p className="card-text">
                To start a quest, click the quests activity button. Clicking the begin or resume quest button will start you on your quest. Each Progress step
                takes a minute, and will increment until the quest is complete. Quests typically reward the player with Coins and Experience. After you complete
                a quest, you will need to manually select another activity.
              </p>
              <ul>
                <li>
                  Quests you can begin will have a <span className="bg-success">green background</span>.
                </li>
                <li>
                  Quests with a <span className="bg-yellowlol">yellow background</span> indicate missing level requirements.
                </li>
                <li>
                  Quests with an <span className="bg-orangelol">orange background</span> indicate missing quest prerequisites.
                </li>
                <li>
                  Quests with a <span className="bg-danger">red background</span> signify the player is missing both quest requirements and level requirements.
                </li>
              </ul>
            </div>
          </div>

          <div className="card col-4">
            <div className="card-body">
              <h5 className="card-title text-center">Combat</h5>
              <p className="card-text">
                Players who choose combat will make progress in defeating enemies via a chosen combat style, and will be rewarded when the enemy is defeated.{" "}
              </p>
              <p className="card-text">
                To start Combat, click the combat activity button. You will need to select an enemy, and a combat style. Combat style determines which combat
                skill is trained, and some enemies are weaker to certain styles. Enemies with a green background are at a lower combat level than you, while
                those in orange and red are higher, and therefore will take longer to defeat. Defeating an ememy wil earn you experience in the chosen skill,
                and Coins.
              </p>
              <ul>
                <li>
                  Equipment you own and can wield will have a <span className="bg-success">green background</span>.
                </li>
                <li>
                  Equipment you own but cannot wield will have a <span className="bg-yellowlol">yellow background</span>.
                </li>
                <li>
                  Equipment you do not own but can wield will have an <span className="bg-orangelol">orange background</span>.
                </li>
                <li>
                  Equipment you do not own and cannot wield will have a <span className="bg-danger">red background</span>.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary" onClick={() => handleMoveToGame()}>
          Play Now
        </button>
      </div>
    </div>
  );
};

export default Lobby;
<div className="card">
  <img src="..." className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>;

<div className="card">
  <img src="" className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">Skilling</h5>
    <p className="card-text">
      To begin skilling, click the skills activity button. Options in green are accesssible, and those in red require a higher level in the respective skill.
    </p>
    <ul>
      <li className="card-text">
        Training Woodcutting requires a hatchet (more powerful hatchets can be bought in the store - store activity button). Select the hatchet you wish to use,
        then click on the type of logs you wish to cut.
      </li>
      <li className="card-text">Training Fishing does not require any type of special equipment, simply click on the fish you wish to catch</li>
    </ul>
    <p className="card-text">
      As you accumulate resources your inventory will fill up (the box at the top right of the screen). Items will automatically be deposited into the bank when
      your inventory is full. You can view your bank by clicking the bank activity button.
    </p>
  </div>
</div>;

<div className="card">
  <img src="..." className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">Combat</h5>
    <p className="card-text">
      To start Combat, click the combat activity button. You will need to select an enemy, and a combat style. Combat style determines which combat skill is
      trained, and some enemies are weaker to certain styles. Enemies with a green background are at a lower combat level than you, while those in orange and
      red are higher, and therefore will take longer to defeat. Defeating an ememy will earn you experience in the chosen skill, and Coins.
    </p>
  </div>
</div>;
