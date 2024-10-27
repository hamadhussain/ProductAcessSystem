import React from "react";
import Navbar from "./Navbar/page";
const layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default layout;
