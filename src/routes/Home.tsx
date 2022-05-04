import * as React from "react";
import { Link } from "react-router-dom";
import { sendRulesToSW } from "../utils/sendRulesToSW";

export const Home = () => {
  return (
    <div>
      <h1>Hey world!</h1>
      <Link to="/subpage">Subpage...</Link>
      <button
        className="mt-3"
        onClick={() => {
          sendRulesToSW(["hey", "what", "the", "fuck"]);
        }}
      >
        Fire message
      </button>
    </div>
  );
};
