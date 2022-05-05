import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from "redux-persist";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { chromePersistStorage } from "./chromePersistStorage";
import { routingSlice } from "./routing.slice";
import { requestsSlice } from "./requests.slice";

const rootReducer = combineReducers({
  [routingSlice.name]: routingSlice.reducer,
  [requestsSlice.name]: requestsSlice.reducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    version: 1,
    storage: chromePersistStorage,
  },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export const StoreWrapper = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export type RootState = ReturnType<typeof store.getState>;
