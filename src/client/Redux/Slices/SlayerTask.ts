import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../Types";

export const SlayerTask = createSlice({
  name: "SlayerTask",
  initialState: {
    task: `none`,
    amount: 0,
    taskCounter: 0,
  },
  reducers: {
    // use this to set the task when a player asks for a task => dispatch object = {task: ``, amount: 0}
    setTask: (state, action) => {
      state.task = action.payload.task;
      state.amount = Number(action.payload.amount);
    },

    // use this when the player defeats an enemy on task, and if it was the last enemy on task, mark the task as complete
    decrementTaskAmount: (state, action) => {
      // decrement amount
      state.amount -= 1;

      // if that was the last enemy on task, mark the task as complete, and increment the task counter
      if (state.amount === 0) {
        state.task = `none`;
        state.taskCounter += 1;
      }
    },

    // use this when the task is skipped
    skipTask: (state, action) => {
      state.task = `none`;
      state.amount = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTask, decrementTaskAmount, skipTask } = SlayerTask.actions;

export default SlayerTask.reducer;
