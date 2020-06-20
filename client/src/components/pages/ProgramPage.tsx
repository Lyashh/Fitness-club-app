import React from "react";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { StoreRouterIdParam } from "../../types/props.types";
import ExerciseInList from "../elements/ExerciseInList";

@inject("store")
@observer
class ProgramPage extends React.Component<StoreRouterIdParam, {}> {
  async componentDidMount() {
    try {
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

  render() {
    const { program } = this.props.store.currentProgramStore;
    const { user } = this.props.store.profileStore;

    return (
      <div>
        {program.id ? (
          <div>
            <h3>
              {program.name} Id: {program.id}
            </h3>
            {user?.role.name === "coach" ? (
              <button
                onClick={() =>
                  this.props.history.push(`/programs/${program.id}/edit`)
                }
              >
                Edit
              </button>
            ) : null}
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

export default withRouter(ProgramPage);
