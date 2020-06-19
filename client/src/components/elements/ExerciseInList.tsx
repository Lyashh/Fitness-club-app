import React from "react";
import { ExerciseListProps } from "../../types/props.types";

const ExerciseInList = (props: ExerciseListProps) => {
  return (
    <div>
      <h4>{props.name}</h4>
      <p>category: {props.category}</p>
    </div>
  );
};

export default ExerciseInList;
