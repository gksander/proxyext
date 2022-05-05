import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { RootState } from "./store";
import { Method } from "../config/methods";

export type AppRequest = {
  id: string;
  createdAt: number;
  title: string;
  method: Method;
  url: string;
  // More...

  lastResponse?: {
    at: number;
    preview?: any;
    statusCode: number;
    headers: Record<string, string>;
  };
};

export const requestsSlice = createSlice({
  name: "requests",
  initialState: {
    requests: {} as Record<string, AppRequest>,
    activeRequestId: null as null | string,
  },
  reducers: {
    selectRequest: (state, action: PayloadAction<{ id: string }>) => {
      state.activeRequestId = action.payload.id;
    },

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

      state.requests[req.id] = req;
      if (!state.activeRequestId) {
        state.activeRequestId = req.id;
      }
    },

    // Deleting a request
    deleteRequest: (state, action: PayloadAction<{ id: string }>) => {
      delete state.requests[action.payload.id];
    },

    // Update a request
    updateActiveRequest: (
      state,
      action: PayloadAction<Partial<Omit<AppRequest, "id" | "createdAt">>>
    ) => {
      const id = state.activeRequestId;
      if (!id) return;

      state.requests[id] = { ...state.requests[id], ...action.payload };
    },

    // Update response
    updateResponse: (
      state,
      action: PayloadAction<{
        requestId: string;
        payload: AppRequest["lastResponse"];
      }>
    ) => {
      const { requestId, payload } = action.payload;
      state.requests[requestId].lastResponse = payload;
    },
  },
});

export const selectRequestsAsList = createSelector(
  (state: RootState) => state.requests.requests,
  (reqs) => {
    return Object.values(reqs);
  }
);

export const selectActiveRequest = createSelector(
  (state: RootState) => state.requests.requests,
  (state: RootState) => state.requests.activeRequestId,
  (reqs, id) => {
    return (id ? reqs[id] : undefined) || Object.values(reqs)[0];
  }
);

export const { updateActiveRequest, updateResponse } = requestsSlice.actions;
