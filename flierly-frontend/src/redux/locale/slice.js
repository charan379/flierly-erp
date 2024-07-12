import lang from "@/locale/languages/en_us";
import statePersist from "../statePersist";
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  result: lang,
  langCode: "en_us",
  isLoading: false,
  isSuccess: false,
};

const PERSISTING_STATE = statePersist.get("locale");

const slice = createSlice({
  name: "locale",
  initialState: PERSISTING_STATE ? PERSISTING_STATE : INITIAL_STATE,
  reducers: {
    // Reducer to change locale language
    CHANGE_LANGUAGE: (state, action) => {
      const NEW_LANG = action.payload;
      for (let [key, value] of Object.entries(NEW_LANG)) {
        if (state.hasOwnProperty(key)) {
          state[key] = value;
        }
      }
    },
    // Reducer to reset locale state to en_US
    RESET: (state) => {
      for (let [key, value] of Object.entries(INITIAL_STATE)) {
        if (state.hasOwnProperty(key)) {
          state[key] = value;
        }
      }
      state['isSuccess'] = true
    },
    // 
  },
});

export default slice;
