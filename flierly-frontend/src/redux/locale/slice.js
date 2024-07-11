import lang from "@/locale/languages/en_us";
import statePersist from "../statePersist";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  result: lang,
  langCode: "en_us",
  isLoading: false,
  isSuccess: false,
};

const persistingState = statePersist.get("locale");

const slice = createSlice({
  name: "locale",
  initialState: persistingState ? persistingState : initialState,
  reducers: {},
});

export default slice;
