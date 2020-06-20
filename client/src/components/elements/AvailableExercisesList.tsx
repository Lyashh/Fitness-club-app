import React from "react";
import { ExerciseListProps } from "../../types/props.types";
import { observer, inject } from "mobx-react";

@inject("store")
@observer
class AvailableExercise extends React.Component<ExerciseListProps, {}> {
  addExercise = async () => {
    try {
      await this.props.store?.currentProgramStore.addExercise([this.props.id]);
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
        <button onClick={this.addExercise}>Add to program</button>
      </div>
    );
  }
}

export default AvailableExercise;
