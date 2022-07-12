import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../Types";

export const Skill = createSlice({
  name: "currentSkill",
  initialState: {
    CurrentSkill: `none`,
  },
  reducers: {
    // this is the only reducer needed as the player can only do 1 thing at a time
    setSkill: (state, action) => {
      state.CurrentSkill = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSkill } = Skill.actions;

export default Skill.reducer;

//! need to add a walking / traveling option / and a questing option
