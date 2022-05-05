import * as React from "react";
import { useDispatch } from "react-redux";
import { useActiveRequest } from "../../hooks/useActiveRequest";
import { updateActiveRequest } from "../../store/requests.slice";
import { isMethod, Method, METHODS } from "../../config/methods";

type EditActiveRequestProps = {};

export const EditActiveRequest = ({}: EditActiveRequestProps) => {
  const dispatch = useDispatch();
  const activeRequest = useActiveRequest();

  const setUrl = React.useCallback(
    (url: string) => {
      dispatch(updateActiveRequest({ url }));
    },
    [dispatch]
  );
  const setMethod = React.useCallback(
    (method: Method) => {
      dispatch(updateActiveRequest({ method }));
    },
    [dispatch]
  );

  if (!activeRequest) return null;

  return (
    <div className="">
      <UrlInput
        method={activeRequest.method}
        setMethod={setMethod}
        url={activeRequest.url}
        setUrl={setUrl}
      />
      <div className="flex p-2 gap-x-2">
        <div>Body</div>
        <div>Query</div>
        <div>Headers</div>
      </div>
      <div className="h-24 flex justify-center items-center">Edit area...</div>
    </div>
  );
};

const UrlInput = ({
  method,
  setMethod,
  url,
  setUrl,
}: {
  method: Method;
  setMethod: (method: Method) => void;
  url: string;
  setUrl: (url: string) => void;
}) => {
  return (
    <div className="flex w-full border-b">
      <div className="flex items-center">
        <label htmlFor="method" className="sr-only">
          Method
        </label>
        <select
          id="method"
          name="method"
          autoComplete="method"
          className="focus:ring-primary-500 focus:border-primary-500 h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 text-xs"
          value={method}
          onChange={(e) => {
            const val = e.currentTarget.value;
            if (isMethod(val)) {
              setMethod(val);
            }
          }}
        >
          {METHODS.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      </div>
      <input
        type="url"
        name="url"
        id="url"
        className="focus:ring-primary-500 focus:border-primary-500 block flex-grow text-xs text-gray-700 border-0"
        placeholder="https://google.com"
        value={url}
        onChange={(e) => {
          setUrl(e.currentTarget.value);
        }}
      />
    </div>
  );
};
