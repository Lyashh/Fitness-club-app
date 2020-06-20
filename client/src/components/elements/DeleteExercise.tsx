import React from "react";
import { DeleteExerciseState } from "../../types/state.types";
import { DeleteExerciseProps } from "../../types/props.types";

class DeleteExercise extends React.Component<
  DeleteExerciseProps,
  DeleteExerciseState
> {
  constructor(props: DeleteExerciseProps) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  handleCheck = () => {
    this.setState({ checked: !this.state.checked }, () => {
      this.props.sendCheckToParent(1, this.state.checked);
    });
  };

  render() {
    return (
      <div>
        <h3>{this.props.name}</h3>
        <label>
          {" "}
          Delete:
          <input
            type="checkbox"
            checked={this.state.checked}
            value="1"
            onChange={this.handleCheck}
          />
        </label>
      </div>
    );
  }
}

export default DeleteExercise;
