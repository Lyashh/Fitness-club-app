import React from "react";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { StoreAndRouterProps } from "../../types/props.types";
import { CreateProgramState } from "../../types/state.types";

@inject("store")
@observer
class CreateProgram extends React.Component<
  StoreAndRouterProps,
  CreateProgramState
> {
  constructor(props: StoreAndRouterProps) {
    super(props);
    this.state = {
      name: "",
    };
  }
  componentDidMount() {
    if (!this.props.store.profileStore.isAuthAndCoach()) {
      this.props.history.push("/profile");
    }
  }

  createProgram = async () => {
    try {
      const newPorgram = await this.props.store.programStore.createProgram(
        this.state.name
      );
      this.props.history.push(`/programs/${newPorgram.data.id}`);
    } catch (error) {
      if (error.code === 401) {
        this.props.history.push("/login");
      }
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <h2>New Program</h2>
        <div>
          <label>Name</label>
          <input
            type="text"
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>
        <button onClick={this.createProgram}>Create</button>
      </div>
    );
  }
}

export default withRouter(CreateProgram);
