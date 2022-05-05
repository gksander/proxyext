import * as React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppRequest,
  requestsSlice,
  selectRequestsAsList,
} from "../store/requests.slice";

export const Home = () => {
  const dispatch = useDispatch();
  const reqList = useSelector(selectRequestsAsList);
  const [responseVal, setResponseVal] = React.useState<string | null>(null);

  const fireRequest = (req: AppRequest) => {
    fetch(req.url, {
      method: req.method,
    })
      .then((res) => res.json())
      .then((json) => {
        setResponseVal(JSON.stringify(json, null, 2));
      });
  };

  return (
    <div>
      <div className="p-2 mb-3">
        <Link to="/subpage">Subpage...</Link>
      </div>
      <h1>Home page</h1>
      <button
        className="mt-3"
        onClick={() => {
          dispatch(requestsSlice.actions.addRequest());
        }}
      >
        Add Request
      </button>

      <div className="mb-2">
        {reqList.map((req) => (
          <div key={req.id} className="flex justify-between">
            <span
              onClick={() => {
                fireRequest(req);
              }}
            >
              Req {req.title}
            </span>
            <button
              type="button"
              onClick={() => {
                dispatch(requestsSlice.actions.deleteRequest({ id: req.id }));
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mb-2">
        <div>Response Value</div>
        <div>{responseVal || "loading..."}</div>
      </div>
    </div>
  );
};
