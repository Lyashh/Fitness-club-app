import React from "react";
import { ProgramsListProps } from "../../types/props.types";
import { observer, inject } from "mobx-react";

@inject("store")
@observer
class AvailableProgram extends React.Component<ProgramsListProps, {}> {
  assignProgram = async () => {
    try {
      await this.props.store?.currentUserStore.assignProgram(this.props.id);
    } catch (error) {
      console.log({ error });
    }
  };
  render() {
    return (
      <div>
        <h3>
          {this.props.name} exercise. Id: {this.props.id}
        </h3>
        <button onClick={this.assignProgram}>Assign Program</button>
      </div>
    );
  }
}

export default AvailableProgram;
