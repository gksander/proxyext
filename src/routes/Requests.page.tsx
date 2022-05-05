import * as React from "react";
import { RootLayout } from "../components/RootLayout";
import { useRootSelector } from "../hooks/useRootSelector";
import { requestsSlice, selectRequestsAsList } from "../store/requests.slice";
import { useDispatch } from "react-redux";

type RequestsPageProps = {};

export const RequestsPage = ({}: RequestsPageProps) => {
  const reqs = useRootSelector(selectRequestsAsList);
  const dispatch = useDispatch();

  return (
    <RootLayout title="Requests">
      <div>Requests here!</div>
      <div className="p-2">
        <button
          onClick={() => {
            dispatch(requestsSlice.actions.addRequest());
          }}
        >
          Add request
        </button>
      </div>
      {reqs.map((req) => (
        <div
          key={req.id}
          className="p-2 cursor-pointer"
          onClick={() => {
            dispatch(requestsSlice.actions.selectRequest({ id: req.id }));
          }}
        >
          {req.title}
        </div>
      ))}
    </RootLayout>
  );
};
