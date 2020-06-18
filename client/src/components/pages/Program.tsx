import React, { useState } from "react";
import { ProgramModel } from "../../mst/models/program";

interface ProgramProps {
  program: ProgramModel;
}
const Program = (props: ProgramProps) => {
  return (
    <div>
      <h3>{props.program.name}</h3>
    </div>
  );
};

export default Program;
