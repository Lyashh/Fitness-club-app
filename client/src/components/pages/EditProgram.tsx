import React from "react";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { StoreRouterIdParam } from "../../types/props.types";
import { PrPageState } from "../../types/state.types";
import ExerciseInList from "../elements/ExerciseInList";

@inject("store")
@observer
class EditProgram extends React.Component<
  StoreRouterIdParam,
  { newName: string }
> {
  constructor(props: StoreRouterIdParam) {
    super(props);
    this.state = {
      newName: "",
    };
  }
  componentDidMount() {
    this.getProgramData();
  }

  async getProgramData() {
    try {
      const permission = this.props.store.profileStore.isAuthAndCoach();
      if (!permission) {
        this.props.history.push("/profile");
      }
      await this.props.store.currentProgramStore.getProgram(
        parseInt(this.props.match.params.id)
      );
    } catch (error) {
      console.log({ error });
      if (error.code === 401) {
        this.props.history.push("/login");
      } else if (error.code === 404) {
        this.props.history.push("/notFound");
      } else if (error.code === 403) {
        this.props.history.push("/profile");
      }
    }
  }

  updateProgram = async () => {
    try {
      await this.props.store.currentProgramStore.editProgram(
        this.state.newName
      );
      this.getProgramData();
    } catch (error) {
      console.log({ error });
      if (error.code === 401) {
        this.props.history.push("/login");
      } else if (error.code === 403) {
        this.props.history.push("/profile");
      }
    }
  };

  render() {
    const { program } = this.props.store.currentProgramStore;
    return (
      <div>
        {program.id ? (
          <div>
            <h3>{program.name}</h3>
            <h2>Edit Name</h2>
            <input
              defaultValue={program.name}
              onChange={(e) => {
                this.setState({ newName: e.target.value });
              }}
            />
            <button onClick={this.updateProgram}>Update Name</button>
            <div>
              <h3>Exercises</h3>
              {program.exercises.length > 0 ? (
                program.exercises.map((exrcise, i) => {
                  return (
                    <ExerciseInList
                      name={exrcise.name}
                      id={exrcise.id}
                      category={exrcise.category.name}
                      key={i}
                    />
                  );
                })
              ) : (
                <p>Program doesn't have exercises</p>
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(EditProgram);
