import React from "react";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { StoreRouterIdParam } from "../../types/props.types";
import ExerciseInList from "../elements/ExerciseInList";
import exercise from "../../models/exercise";

@inject("store")
@observer
class ProgramPage extends React.Component<StoreRouterIdParam, {}> {
  async componentDidMount() {
    try {
      await this.props.store.currentProgramStore.clear();
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

  backToProgramsList = () => {
    this.props.history.push("/programs");
  };

  render() {
    const { program } = this.props.store.currentProgramStore;
    const { user } = this.props.store.profileStore;

    const exercises = (
      <Row>
        <Col md={12}>
          <h4 className="m-b-30">Exercises:</h4>
          {program.exercises.length > 0 ? (
            program.exercises.map((exrcise, i) => {
              return (
                <ExerciseInList
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
      </Row>
    );

    const editButton =
      user?.role?.name === "coach" ? (
        <Button
          className="float-r m-t-30"
          variant="primary"
          onClick={() =>
            this.props.history.push(`/programs/${program.id}/edit`)
          }
        >
          Edit
        </Button>
      ) : null;

    const info = (
      <div>
        <h3>{program.name}</h3>
        <p className="t-a-just m-t-30">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
          enim odit pariatur vitae beatae sint esse quam. Enim eligendi facere
          pariatur aliquam quas maxime vitae assumenda magnam eum, porro
          tenetur.
        </p>
        {editButton}
      </div>
    );

    return (
      <Container className="m-t-30">
        {program.id ? (
          <Row>
            <Col md={12} className="m-b-50">
              <Button variant="primary" onClick={this.backToProgramsList}>
                {"Back"}
              </Button>
            </Col>
            <Col md={7}>{info}</Col>
            <Col md={5} className="t-a-cen">
              <img className="program-main-img" />
            </Col>
            <Col md={12}>{exercises}</Col>
          </Row>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
    );
  }
}

export default withRouter(ProgramPage);
