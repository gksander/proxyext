import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE = { name: "foo" };

export const fooSlice = createSlice({
  name: "foo",
  initialState: DEFAULT_STATE,
  reducers: {
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});
