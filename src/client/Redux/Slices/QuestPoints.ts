import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../Types";

export const QuestPoints = createSlice({
  name: "questpoints",
  initialState: {
    CurrentQuestPoints: 0,
  },
  reducers: {
    addQuestPoints: (state: Types.IFlatObjectOfNums, action) => {
      const amount: number = Number(action.payload);
      state.CurrentQuestPoints += amount;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addQuestPoints } = QuestPoints.actions;

export default QuestPoints.reducer;
