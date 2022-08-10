import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../Types";

export const SlayerTask = createSlice({
  name: "SlayerTask",
  initialState: {
    task: [`none`],
    taskMaster: ``,
    amount: 0,
    taskCounter: 0,
    slayerPoints: 0,
  },
  reducers: {
    // use this to set the task when a player asks for a task => dispatch object = {task: ``, taskMaster: ``, amount: 0}
    setTask: (state, action) => {
      state.task = action.payload.task;
      state.taskMaster = action.payload.taskMaster;
      state.amount = Number(action.payload.amount);
    },

    // use this when the player defeats an enemy on task, and if it was the last enemy on task, mark the task as complete
    decrementTaskAmount: (state, action) => {
      // decrement amount
      state.amount -= 1;

      // if that was the last enemy on task, mark the task as complete, and increment the task counter
      if (state.amount === 0) {
        state.task = [`none`];
        state.taskCounter += 1;
        state.taskMaster = ``;

        const amount: number = Number(action.payload); // this will be the number of slayerPoints added to state
        state.slayerPoints += amount;
      }
    },

    // use this when the task is skipped
    skipTask: (state) => {
      state.task = [`none`];
      state.taskMaster = ``;
      state.amount = 0;
    },

    // use this when we need to remove slayerPoints to state
    removeSlayerPoints: (state, action) => {
      const amount: number = Number(action.payload); // this will be the number of slayerPoints removed to state

      if (state.slayerPoints - amount >= 0) {
        // prevent the removal of an amount that would result in a negative
        state.slayerPoints -= amount; // subtract the slayerPoints
      } else {
        // remove all of the slayerPoints, setting state to 0
        state.slayerPoints = 0;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTask, decrementTaskAmount, removeSlayerPoints, skipTask } = SlayerTask.actions;

export default SlayerTask.reducer;
