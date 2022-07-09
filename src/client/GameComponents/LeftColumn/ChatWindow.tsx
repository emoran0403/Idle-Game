import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect, useState } from "react";

//@ multiple components need to be able to add to this - pass a function in props
//! style buttons to show user which filters are applied
const ChatWindow = (props: Types.ChatWindowCompProps) => {
  // this will hold the chatLogs that will be displayed
  const [displayedChatLogArray, setdisplayedChatLogArray] = useState<Types.IChatLog[]>([]);

  const [showingChat, setShowingChat] = useState<boolean>(true);
  const [tagsToHide, setTagsToHide] = useState<Types.ChatLogTag[]>([]);

  const showChatJSX = () => {
    return (
      <div>
        {displayedChatLogArray.map((chatLog, i) => (
          <div className="d-flex flex-row justify-content-between" key={`ChatLog-at-${chatLog.timeStamp}-${i}`}>
            <div className="badge rounded-pill bg-primary">{chatLog.timeStamp}</div>
            <div className="text-wrap">{chatLog.message}</div>
          </div>
        ))}
      </div>
    );
  };

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

  const removeAllFilters = () => {
    let tagsToHideTemp = [...tagsToHide];
    tagsToHideTemp.splice(0, 100); // from the fist index, delete 100 items, since this is more than the number of items in the array, all items will be removed
    setTagsToHide([...tagsToHideTemp]);
  };

  //@ if adding more tags, add them here
  const addAllFilters = () => {
    let allFilters: Types.ChatLogTag[] = [
      `Gained Resource`,
      `Monster Drop`,
      `Rare Item`,
      `Level Up`,
      `Gained XP`,
      `Quest Completed`,
      `Equipment Swap`,
      `Activity Swap`,
      `Misc`,
    ];
    setTagsToHide([...allFilters]);
  };
  //@ if adding more tags, make another button
  const showFiltersJSX = () => {
    return (
      <div>
        <div>
          <button
            onClick={() => {
              removeAllFilters();
            }}
            className="btn btn-light"
          >
            Remove all filters
          </button>
          <button
            onClick={() => {
              addAllFilters();
            }}
            className="btn btn-light"
          >
            Add all filters
          </button>
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
          <button
            onClick={() => {
              addOrRemoveFilters(`Monster Drop`);
            }}
            className="btn btn-primary"
          >
            Monster Drop
          </button>
          <button
            onClick={() => {
              addOrRemoveFilters(`Equipment Swap`);
            }}
            className="btn btn-primary"
          >
            Equipment Swap
          </button>

          <button
            onClick={() => {
              addOrRemoveFilters(`Activity Swap`);
            }}
            className="btn btn-primary"
          >
            Activity Swap
          </button>

          <button
            onClick={() => {
              addOrRemoveFilters(`Misc`);
            }}
            className="btn btn-primary"
          >
            Misc.
          </button>
        </div>
        <div>
          <span>Filtering out: </span>
          {tagsToHide.length === 0 && <span>Nothing</span>}
          {tagsToHide.map((tag) => (
            <span key={`Filtering-out-${tag}`}>{tag}, </span>
          ))}
        </div>
      </div>
    );
  };

  // if tagsToHide changes, we need to add / remove chat logs based on the new settings
  useEffect(() => {
    // make a copy of the chatLogArray
    let tempChatLogArray: Types.IChatLog[] = [...props.chatLogArray];
    // filter out those logs whose tags are included in the array of tags to hide
    // set the new chatLogArray to state
    let chatLogsToShow = tempChatLogArray.filter((chatLog) => !tagsToHide.includes(chatLog.tags)).reverse();
    setdisplayedChatLogArray(chatLogsToShow);
    console.log(chatLogsToShow);
  }, [tagsToHide, props.chatLogArray]);

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
        {showingChat && showChatJSX()}
        {!showingChat && showFiltersJSX()}
      </div>
    </div>
  );
};

export default ChatWindow;
