import * as React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppRequest,
  requestsSlice,
  selectRequestsAsList,
  updateResponse,
} from "../../store/requests.slice";
import { Paths } from "../../config/paths";
import { useActiveRequest } from "../../hooks/useActiveRequest";
import { EditActiveRequest } from "./EditActiveRequest";
import { ResponseDetails } from "./ResponseDetails";
import { FireRequestButton } from "./FireRequestButton";

export const HomePage = () => {
  const dispatch = useDispatch();
  const activeRequest = useActiveRequest();

  const [responseVal, setResponseVal] = React.useState("");
  const fireRequest = () => {
    if (!activeRequest) return;

    fetch(activeRequest.url, {
      method: activeRequest.method,
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(
          updateResponse({
            requestId: activeRequest.id,
            payload: {
              at: Date.now(),
              preview: json,
              statusCode: 200, // TODO:
              headers: {}, // TODO:
            },
          })
        );
      });
  };

  return (
    <div className="h-full overflow-hidden flex flex-col">
      <div className="p-2 border-b">
        <span>{activeRequest?.title}</span>
        <Link to={Paths.REQUESTS}>Requests</Link>
      </div>
      <EditActiveRequest />
      <FireRequestButton fireRequest={fireRequest} />
      <ResponseDetails responseValue={responseVal} />
    </div>
  );
};
