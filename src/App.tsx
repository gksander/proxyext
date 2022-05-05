import React, { PropsWithChildren } from "react";
import { StoreWrapper } from "./store/store";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "./routes/Home/Home.page";
import { SubPage } from "./routes/SubPage";
import { useDispatch } from "react-redux";
import { routingSlice } from "./store/routing.slice";
import { useRootSelector } from "./hooks/useRootSelector";
import { Paths } from "./config/paths";
import { RequestsPage } from "./routes/Requests.page";

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
  useTrackActivePath();

  return (
    <Routes>
      <Route path={Paths.REQUESTS} element={<RequestsPage />} />
      <Route path={Paths.HOME} element={<HomePage />} />
    </Routes>
  );
};

/**
 * Tracking active path in Redux
 */
const useTrackActivePath = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(routingSlice.actions.setActivePath(location.pathname));
  }, [dispatch, location.pathname]);
};
