import React from "react";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { getProgramById, editProgramRequest } from "../../api/programs.api";
import { StoreRouterIdParam } from "../../types/props.types";
import { EditProgramState } from "../../types/state.types";

@inject("store")
@observer
class EditProgram extends React.Component<
  StoreRouterIdParam,
  EditProgramState
> {
  constructor(props: StoreRouterIdParam) {
    super(props);
    this.state = {
      id: 0,
      name: "",
      newName: "",
    };
  }

  async componentDidMount() {
    try {
      const program = await getProgramById(
        parseInt(this.props.match.params.id)
      );
      this.setState({ name: program.data.name, id: program.data.id });
    } catch (error) {
      console.log({ error });
      if (error.response.status === 401) {
        this.props.history.push("/login");
      } else if (error.response.status === 404) {
        this.props.history.push("/notFound");
      } else if (error.response.status === 403) {
        this.props.history.push("/profile");
      }
    }
  }

  editName = async () => {
    try {
      const editProgram = await editProgramRequest({
        id: this.state.id,
        newFields: { name: this.state.newName },
      });
      this.setState({ name: editProgram.data.name });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        {this.state.id ? (
          <div>
            <p>Edit name</p>
            <p>{this.state.name}</p>
            <input
              onChange={(e) => this.setState({ newName: e.target.value })}
              defaultValue={this.state.name}
            />
            <button onClick={this.editName}>Edit Name</button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(EditProgram);
