import React from "react";

const BodyWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex flex-col items-center ">{children}</div>;
};

export default BodyWrapper;
