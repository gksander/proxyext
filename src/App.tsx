import React, { PropsWithChildren } from "react";
import { StoreWrapper } from "./store/store";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./routes/Home";
import { SubPage } from "./routes/SubPage";
import { useDispatch } from "react-redux";
import { routingSlice } from "./store/routing.slice";
import { useRootSelector } from "./hooks/useRootSelector";

export const App = () => {
  return (
    <StoreWrapper>
      <Router>
        <AppBody />
      </Router>
    </StoreWrapper>
  );
};

const Router = ({ children }: PropsWithChildren<{}>) => {
  const activePath = useRootSelector((state) => state.routing.activePath);
  return <MemoryRouter initialEntries={[activePath]}>{children}</MemoryRouter>;
};

const AppBody = () => {
  // const name = useRootSelector((state) => state.foo.name);
  // const dispatch = useDispatch();
  //
  // const [val, setVal] = React.useState("");
  // useEffect(() => {
  //   // chrome.storage.sync.set({ message: "hey whatup" });
  //   // fetch("https://jsonplaceholder.typicode.com/todos/1")
  //   //   .then((response) => response.json())
  //   //   .then((json) => {
  //   //     setVal(JSON.stringify(json, null, 2));
  //   //   });
  // }, []);

  useTrackActivePath();

  return (
    <div className="p-3 bg-gray-100">
      <Routes>
        <Route path="/subpage" element={<SubPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

const useTrackActivePath = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(routingSlice.actions.setActivePath(location.pathname));
  }, [dispatch, location.pathname]);
};
