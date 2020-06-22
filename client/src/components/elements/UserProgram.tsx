import React from "react";
import { UserProgramListProps } from "../../types/props.types";
import { observer, inject } from "mobx-react";

@inject("store")
@observer
class UserProgram extends React.Component<UserProgramListProps, {}> {
  unassignProgram = async () => {
    try {
      await this.props.store?.currentUserStore.unassignProgram(this.props.id);
    } catch (error) {
      console.log({ error });
    }
  };

  render() {
    return (
      <div>
        <h3>{this.props.name}</h3>
        <button onClick={this.unassignProgram}>Unassign program</button>
      </div>
    );
  }
}

export default UserProgram;
