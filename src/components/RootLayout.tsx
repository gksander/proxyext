import * as React from "react";
import { Link } from "react-router-dom";
import { Paths } from "../config/paths";

type RootLayoutProps = React.PropsWithChildren<{
  title: string | React.ReactNode;
}>;

export const RootLayout = ({ title, children }: RootLayoutProps) => {
  return (
    <div className="bg-red-300 h-full flex flex-col">
      <div>
        <Link to={Paths.HOME}>Home</Link>
      </div>
      <div className="overflow-scroll flex-grow bg-blue-300">{children}</div>
    </div>
  );
};
