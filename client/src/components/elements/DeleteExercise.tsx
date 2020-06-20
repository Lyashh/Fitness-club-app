import React from "react";
import { DeleteListProps } from "../../types/props.types";
import { observer, inject } from "mobx-react";

@inject("store")
@observer
class DeleteExercise extends React.Component<DeleteListProps, {}> {
  deleteExercise = async () => {
    try {
      const deleted = await this.props.store?.currentProgramStore.deleteExercise(
        [this.props.id]
      );
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
