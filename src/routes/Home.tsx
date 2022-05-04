import * as React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <h1>Hey world!</h1>
      <Link to="/subpage">Subpage...</Link>
    </div>
  );
};
