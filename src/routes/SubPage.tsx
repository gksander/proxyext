import * as React from "react";
import { Link } from "react-router-dom";

export const SubPage = () => {
  const [val, setVal] = React.useState("");
  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => {
        return response;
      })
      .then((response) => response.json())
      .then((json) => {
        setVal(JSON.stringify(json, null, 2));
      });
  }, []);

  return (
    <div>
      <div className="p-2 mb-3">
        <Link to="/">Home...</Link>
      </div>
      <h1>Sub page...</h1>
      <div>{val || "Loading..."}</div>
    </div>
  );
};
