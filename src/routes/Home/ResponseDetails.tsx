import * as React from "react";
import { useActiveRequest } from "../../hooks/useActiveRequest";

type ResponseDetailsProps = {
  responseValue: string;
};

export const ResponseDetails = ({ responseValue }: ResponseDetailsProps) => {
  const activeRequest = useActiveRequest();

  return (
    <div className="flex-grow bg-blue-200 flex flex-col">
      <div className="p-2 flex gap-x-2">
        <span>200</span>
        <span>83B</span>
      </div>
      <div className="flex p-2 gap-x-2">
        <div>Preview</div>
        <div>Headers</div>
        <div>Cookies</div>
      </div>
      <div className="flex-grow flex justify-center items-center">
        {JSON.stringify(activeRequest?.lastResponse?.preview) || "Nothing..."}
      </div>
    </div>
  );
};
