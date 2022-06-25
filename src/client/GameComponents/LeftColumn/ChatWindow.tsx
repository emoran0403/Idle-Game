import * as Types from "../../../../Types";
import * as React from "react";
import Dayjs from "dayjs";
import { useState } from "react";

const ChatWindow = (props: Types.NoProps) => {
  const [chatLogArray, setChatLogArray] = useState<[]>([]);

  return (
    <div className="card border border-dark border-2 rounded-3" style={{ overflowY: "auto", position: "relative", height: "33%" }}>
      <div className="card-body">
        <h6>This is ChatWindow</h6>
      </div>
    </div>
  );
};

export default ChatWindow;

//! work this just like chirper
/**
 * map over an array of 50 objects
 * if over 50 objects, remove the first object
 */
const chatLog = {
  timeStamp: Dayjs().format("HH:mm:ss"), // or something like this
  message: `some message here`,
  tags: [`woodcutting`, `monster drop`, `rare item`, `level up`, `gained xp`],
};
