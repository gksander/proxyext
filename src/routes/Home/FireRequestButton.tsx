import * as React from "react";

type FireRequestButtonProps = {
  fireRequest: () => void;
};

export const FireRequestButton = ({ fireRequest }: FireRequestButtonProps) => {
  return (
    <button
      type="button"
      onClick={fireRequest}
      className="h-8 bg-red-300 flex justify-center items-center"
    >
      Fire that shit
    </button>
  );
};
