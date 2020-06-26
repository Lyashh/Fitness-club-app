import React from "react";
import { ExerciseListProps } from "../../types/props.types";
import { observer, inject } from "mobx-react";
import { Col, Button } from "react-bootstrap";

@inject("store")
@observer
class DeleteExercise extends React.Component<ExerciseListProps, {}> {
  deleteExercise = async () => {
    try {
      await this.props.store?.currentProgramStore.deleteExercise([
        this.props.id,
      ]);
    } catch (error) {
      console.log({ error });
    }
  };

  render() {
    return (
      <Col md={12} className="exercise-list-container">
        <div className="exercise-box">
          <img className="exercise-icon" />
          <h5 className="inline">{this.props.name}</h5>
          <Button variant="danger" onClick={this.deleteExercise}>
            Unassign
          </Button>
          <div className="exercise-info">
            <small>
              <span className="bold-text">Category:</span> {this.props.category}
            </small>
            <small>
              {" "}
              <span className="bold-text">Quantity:</span> x
              {this.props.quantity}
            </small>
          </div>
        </div>
      </Col>
    );
  }
}

export default DeleteExercise;
