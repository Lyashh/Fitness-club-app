import React from "react";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { StoreRouterIdParam } from "../../types/props.types";
import DeleteExercise from "../elements/DeleteExercise";
import AvailableExercise from "../elements/AvailableExercisesList";

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
    this.getProgramAndEExercises();
  }

  async getProgramAndEExercises() {
    try {
      await this.props.store.currentProgramStore.clear();

      await this.props.store.currentProgramStore.getProgram(
        parseInt(this.props.match.params.id)
      );
      await this.props.store.exerciseStore.getExercises();
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
    const { exerciseStore } = this.props.store;
    const programExercises = (
      <div style={{ width: "50%" }}>
        <h3>Program`s Exercises</h3>
        {program.exercises.length > 0 ? (
          program.exercises.map((exrcise, i) => {
            return (
              <DeleteExercise
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
    );

    const availableExercises = (
      <div style={{ width: "50%" }}>
        <h3>Available Exercises</h3>
        {exerciseStore.getAvailable().map((exercise, i) => {
          return (
            <AvailableExercise
              key={i}
              name={exercise.name}
              id={exercise.id}
              category={exercise.category.name}
            />
          );
        })}
      </div>
    );

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
            <div style={{ width: "100%", display: "flex" }}>
              {programExercises}
              {availableExercises}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(EditProgram);
