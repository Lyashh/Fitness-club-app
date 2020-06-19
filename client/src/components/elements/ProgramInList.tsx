import React from "react";
import { ProgramModel } from "../../mst/models/program";
import { Link } from "react-router-dom";

interface ProgramProps {
  program: ProgramModel;
}
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
