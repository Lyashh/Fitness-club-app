import React from "react";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { getProgramById } from "../../api/programs.api";
import { StoreRouterIdParam } from "../../types/props.types";
import { PrPageState } from "../../types/state.types";
import ExerciseInList from "../elements/ExerciseInList";

@inject("store")
@observer
class ProgramPage extends React.Component<StoreRouterIdParam, PrPageState> {
  constructor(props: StoreRouterIdParam) {
    super(props);
    this.state = {
      id: 0,
      name: "",
      exercises: [],
    };
  }
  async componentDidMount() {
    try {
      const program = await getProgramById(
        parseInt(this.props.match.params.id)
      );
      this.setState({
        name: program.data.name,
        id: program.data.id,
        exercises: program.data.exercises,
      });
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

  render() {
    const { store } = this.props;
    return (
      <div>
        {this.state.id ? (
          <div>
            <h3>{this.state.name}</h3>
            {store?.profileStore.user?.role.name === "coach" ? (
              <button
                onClick={() =>
                  this.props.history.push(`/programs/${this.state.id}/edit`)
                }
              >
                Edit
              </button>
            ) : null}
            <div>
              <h3>Exercises</h3>
              {this.state.exercises.length > 0 ? (
                this.state.exercises.map((exrcise) => {
                  return (
                    <ExerciseInList
                      name={exrcise.name}
                      id={exrcise.id}
                      category={exrcise.category.name}
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
