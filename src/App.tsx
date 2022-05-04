import React, { useEffect } from "react";
import { StoreWrapper } from "./store/store";
import { useRootSelector } from "./hooks/useRootSelector";
import { useDispatch } from "react-redux";
import { fooSlice } from "./store/foo.slice";

export const App = () => {
  return (
    <StoreWrapper>
      <AppBody />
    </StoreWrapper>
  );
};

const AppBody = () => {
  const name = useRootSelector((state) => state.foo.name);
  const dispatch = useDispatch();

  const [val, setVal] = React.useState("");
  useEffect(() => {
    // chrome.storage.sync.set({ message: "hey whatup" });
    // fetch("https://jsonplaceholder.typicode.com/todos/1")
    //   .then((response) => response.json())
    //   .then((json) => {
    //     setVal(JSON.stringify(json, null, 2));
    //   });
  }, []);

  return (
    <div className="p-3 bg-gray-100">
      <header className="App-header">
        <p className="text-lg font-bold text-gray-800">
          {name || "loading..."}
        </p>
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.currentTarget.value)}
        />
        <button
          type="button"
          onClick={() => {
            dispatch(fooSlice.actions.changeName(val));
          }}
        >
          SAVE
        </button>
      </header>
    </div>
  );
};
