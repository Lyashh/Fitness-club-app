import React from "react";

interface ProgramProps {
  message?: string;
}

const NoFound = (props: ProgramProps) => {
  return (
    <div>
      <h1>404</h1>
      <p>{props.message}</p>
    </div>
  );
};

export default NoFound;
