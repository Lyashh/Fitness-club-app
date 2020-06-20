import React from "react";
import { ExerciseListProps } from "../../types/props.types";
import { observer, inject } from "mobx-react";

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
      <div>
        <p>
          {this.props.name} exercise. Id: {this.props.id}
        </p>
        <button onClick={this.deleteExercise}>Delete</button>
      </div>
    );
  }
}

export default DeleteExercise;