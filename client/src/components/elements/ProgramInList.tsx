import React from "react";
import { Link } from "react-router-dom";
import { ProgramProps } from "../../types/props.types";

const Program = (props: ProgramProps) => {
  return (
    <div>
      <Link to={`/programs/${props.program.id}`}>
        <h3>{props.program.name}</h3>
      </Link>
    </div>
  );
};

export default Program;
