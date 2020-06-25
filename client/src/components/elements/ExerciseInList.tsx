import React from "react";
import { ExerciseListProps } from "../../types/props.types";
import { Col } from "react-bootstrap";

const ExerciseInList = (props: ExerciseListProps) => {
  return (
    <Col md={4} className="exercise-list-container">
      <div className="exercise-box">
        <img className="exercise-icon" />
        <h5 className="inline">{props.name}</h5>
        <div className="exercise-info">
          <small>
            <span className="bold-text">Category:</span> {props.category}
          </small>
          <small>
            {" "}
            <span className="bold-text">Quantity:</span> x{props.quantity}
          </small>
        </div>
      </div>
    </Col>
  );
};

export default ExerciseInList;
