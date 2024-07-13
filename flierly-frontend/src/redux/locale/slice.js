import statePersist from "../statePersist";
import { createSlice } from "@reduxjs/toolkit";
import languages from "@/locale/languages";

const INITIAL_STATE = {
  result: languages["en_us"],
  langCode: "en_us",
  langDirection: "ltr",
  isLoading: false,
  isSuccess: false,
};

const PERSISTING_STATE = statePersist.get("locale");

const slice = createSlice({
  //
  name: "locale",
  //
  initialState: PERSISTING_STATE ? PERSISTING_STATE : INITIAL_STATE,
  //
  reducers: {
    // Reducer to change locale language
    CHANGE_LANGUAGE: (state, action) => {
      const LANG_CODE = action.payload.toLowerCase();
      // Change Language
      if (languages.hasOwnProperty(LANG_CODE)) {
        state["result"] = languages[LANG_CODE];
        state["langCode"] = LANG_CODE;
        state["isSuccess"] = true;
      } else {
        state["isSuccess"] = false;
      }
      //
      window.localStorage.setItem("locale", JSON.stringify(state));
    },
    CHANGE_LANG_DIRECTION: (state, action) => {
      const langDir = action.payload.toLowerCase();
      // Change language direction
      if (["ltr", "rtl"].includes(langDir)) {
        state["langDirection"] = langDir;
        state["isSuccess"] = true;
      } else {
        state["isSuccess"] = false;
      }
      window.localStorage.setItem("locale", JSON.stringify(state));
    },
    // Reducer to reset locale state to en_US
    RESET: (state) => {
      for (let [key, value] of Object.entries(INITIAL_STATE)) {
        if (state.hasOwnProperty(key)) {
          state[key] = value;
        }
      }
      state["isSuccess"] = true;
      window.localStorage.setItem("locale", JSON.stringify(state));
    },
    //
  },
});

export default slice;
