import * as Types from "../../../../Types";
import * as React from "react";
import Dayjs from "dayjs";
import { useState } from "react";

//! work this just like chirper
//! multiple components need to be able to add to this - export a function in props
const ChatWindow = (props: Types.NoProps) => {
  // initialize the chatLogArray with a default welcome message
  const [chatLogArray, setChatLogArray] = useState<Types.IChatLog[]>([
    {
      timeStamp: Dayjs().format("HH:mm:ss"),
      message: `Welcome to the game!`,
      tags: [`Welcome`],
    },
  ]);

  const [showingChat, setShowingChat] = useState<boolean>(true);
  const [tagsToHide, setTagsToHide] = useState<Types.ChatLogTag[]>([]);

  const handleNewChatLog = (message: string, tags: Types.ChatLogTag[]) => {
    // create a newLog object by generating a timestamp, and the given message and tags array
    let newLog: Types.IChatLog = {
      timeStamp: Dayjs().format("HH:mm:ss"),
      message,
      tags,
    };

    // we only want to hold the most recent 50 logs, removing the oldest
    if (chatLogArray.length >= 50) {
      let tempchatLogArray = [...chatLogArray]; // clone chatLogArray into a temp array
      tempchatLogArray.shift(); // remove the first item (don't assign this, as it returns the removed element)
      tempchatLogArray.push(newLog); // adds the new log to the end of the array
      setChatLogArray(tempchatLogArray); // updates the chatLogArray with the new log
    } else {
      setChatLogArray([...chatLogArray, newLog]);
    }
  };

  const showChatJSX = () => {
    return (
      <div>
        {chatLogArray.map((chatLog) => (
          <div className="d-flex flex-row justify-content-between" key={`ChatLog-at-${chatLog.timeStamp}`}>
            <div className="badge rounded-pill bg-primary">{chatLog.timeStamp}</div>
            <div className="text-wrap">{chatLog.message}</div>
          </div>
        ))}
      </div>
    );
  };

  //! add a way to filter by tags

  const addOrRemoveFilters = (tagToToggle: Types.ChatLogTag) => {
    // if the tagToToggle exists in the array, remove it
    if (tagsToHide.includes(tagToToggle)) {
      let tagsToHideTemp = [...tagsToHide];
      const indexToRemove = tagsToHideTemp.indexOf(tagToToggle); // get the index of the tag to be removed
      tagsToHideTemp.splice(indexToRemove, 1); // go to the index of the tag to be removed, and remove it
      setTagsToHide([...tagsToHideTemp]);
    } else {
      // if the tagToToggle does not exist in the array, add it
      setTagsToHide([...tagsToHide, tagToToggle]);
    }
  };

  const showFiltersJSX = () => {
    return (
      <div>
        <div>
          <span>Filtering out: </span>

          {tagsToHide.length === 0 && <span>Nothing</span>}
          {tagsToHide.map((tag) => (
            <span key={`Filtering-out-${tag}`}>{tag}, </span>
          ))}
        </div>
        <div>
          <button
            onClick={() => {
              addOrRemoveFilters(`Gained Resource`);
            }}
            className="btn btn-primary"
          >
            Gained Resource
          </button>
          <button
            onClick={() => {
              addOrRemoveFilters(`Gained XP`);
            }}
            className="btn btn-primary"
          >
            Gained XP
          </button>
          <button
            onClick={() => {
              addOrRemoveFilters(`Level Up`);
            }}
            className="btn btn-primary"
          >
            Level Up
          </button>
          <button
            onClick={() => {
              addOrRemoveFilters(`Rare Item`);
            }}
            className="btn btn-primary"
          >
            Rare Item
          </button>
          <button
            onClick={() => {
              addOrRemoveFilters(`Quest Completed`);
            }}
            className="btn btn-primary"
          >
            Quest Completed
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="card border border-dark border-2 rounded-3" style={{ overflowY: "auto", position: "relative", height: "33%" }}>
      <div className="card-body">
        <div className="d-flex flex-row justify-content-evenly card-header">
          <button
            onClick={() => {
              setShowingChat(true);
            }}
            className="btn btn-primary"
          >
            Chat
          </button>
          <button
            onClick={() => {
              setShowingChat(false);
            }}
            className="btn btn-primary"
          >
            Filters
          </button>
        </div>
        {showingChat ? showChatJSX() : showFiltersJSX()}
      </div>
    </div>
  );
};

export default ChatWindow;
