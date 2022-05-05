import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { RootState } from "./store";

export type AppRequest = {
  id: string;
  createdAt: number;
  title: string;
  method: "GET" | "POST";
  url: string;
  // More...
};

export const requestsSlice = createSlice({
  name: "requests",
  initialState: {} as Record<string, AppRequest>,
  reducers: {
    // Add a request (basic defaults)
    addRequest: (state) => {
      const n = Math.floor(1 + 10 * Math.random());
      const req: AppRequest = {
        id: v4(),
        createdAt: Date.now(),
        title: `Test request ${n}`,
        method: "GET",
        url: `https://jsonplaceholder.typicode.com/todos/${n}`,
      };

      state[req.id] = req;
    },

    // Deleting a request
    deleteRequest: (state, action: PayloadAction<{ id: string }>) => {
      delete state[action.payload.id];
    },

    // Update a request
    updateRequest: (
      state,
      action: PayloadAction<{
        id: string;
        payload: Partial<Omit<AppRequest, "id" | "createdAt">>;
      }>
    ) => {
      const { id, payload } = action.payload;
      state[id] = { ...state[id], ...payload };
    },
  },
});

export const selectRequestsAsList = createSelector(
  (state: RootState) => state.requests,
  (reqs) => {
    return Object.values(reqs);
  }
);
