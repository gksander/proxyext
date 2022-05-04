import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const routingSlice = createSlice({
  name: "routing",
  initialState: { activePath: "/" },
  reducers: {
    setActivePath: (state, action: PayloadAction<string>) => {
      state.activePath = action.payload;
    },
  },
});
