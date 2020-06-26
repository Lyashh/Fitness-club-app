import React from "react";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { StoreRouterIdParam } from "../../types/props.types";
import DeleteExercise from "../elements/DeleteExercise";
import AvailableExercise from "../elements/AvailableExercisesList";
import { EditProgramState } from "../../types/state.types";
import CustomError from "../../types/customError.types";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";

@inject("store")
@observer
class EditProgram extends React.Component<
  StoreRouterIdParam,
  EditProgramState
> {
  constructor(props: StoreRouterIdParam) {
    super(props);
    this.state = {
      newName: "",
      errorBody: "",
      errorView: false,
      successBody: "",
      successView: false,
    };
  }
  componentDidMount() {
    this.getProgramAndEExercises();
  }

  validation() {
    if (this.state.newName.length < 3) {
      throw new CustomError(`"name" is not allowed to be empty`);
    }
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
      this.validation();
      console.log(1);
      await this.props.store.currentProgramStore.editProgram(
        this.state.newName
      );
      this.setState({
        errorView: false,
        successBody: "The name of program has been updated",
        successView: true,
      });
    } catch (error) {
      if (error.code === 401) {
        this.props.history.push("/login");
      } else if (error.code === 403) {
        this.props.history.push("/profile");
      }
      if (error.body) {
        this.setState({
          errorBody: error.body,
          errorView: true,
          successView: false,
        });
      }
    }
  };

  backToProrgramPage = () => {
    this.props.history.push(
      `/programs/${this.props.store.currentProgramStore.program.id}`
    );
  };

  render() {
    const { program } = this.props.store.currentProgramStore;
    const { exerciseStore } = this.props.store;
    const programExercises = (
      <Col md={5}>
        <h4 className="m-b-30">Program's Exercises:</h4>
        {program.exercises.length > 0 ? (
          program.exercises.map((exrcise, i) => {
            return (
              <DeleteExercise
                quantity={exrcise.quantity}
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
      </Col>
    );

    const availableExercises = (
      <Col md={5}>
        <h4 className="m-b-30">Available Exercises</h4>
        {exerciseStore.getAvailable().map((exercise, i) => {
          return (
            <AvailableExercise
              quantity={exercise.quantity}
              key={i}
              name={exercise.name}
              id={exercise.id}
              category={exercise.category.name}
            />
          );
        })}
      </Col>
    );

    const error = this.state.errorView ? (
      <p className="text-danger">
        {this.state.errorBody.replace("newFields.name", "name")}
      </p>
    ) : null;

    const success = this.state.successView ? (
      <p className="text-success">{this.state.successBody}</p>
    ) : null;

    const exercisesTable = (
      <Col md={12} className="m-t-70 m-b-50">
        <Row className="justify-content-between">
          {programExercises}
          {availableExercises}
        </Row>
      </Col>
    );

    return (
      <Container className="m-t-30">
        {program.id ? (
          <Row>
            <Col md={12} className="m-b-50">
              <Button variant="primary" onClick={this.backToProrgramPage}>
                {"Back"}
              </Button>
            </Col>
            <Col md={6}>
              <h3>{program.name}</h3>
              <p className="m-t-50">Edit Name</p>
              <InputGroup className="edit-program-input">
                <FormControl
                  className="mb-3 edit-program-input"
                  placeholder="Enter new name"
                  onChange={(e) => {
                    this.setState({ newName: e.target.value });
                  }}
                />
              </InputGroup>
              <div>
                {error}
                {success}
              </div>
              <Button variant="primary" onClick={this.updateProgram}>
                Update
              </Button>
            </Col>
            <Col md={6} className="t-a-cen">
              <img className="program-main-img" />
            </Col>
            {exercisesTable}
          </Row>
        ) : null}
      </Container>
    );
  }
}

export default withRouter(EditProgram);
