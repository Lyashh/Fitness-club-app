import React from "react";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { StoreAndRouterProps } from "../../types/props.types";
import { CreateProgramState } from "../../types/state.types";
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
class CreateProgram extends React.Component<
  StoreAndRouterProps,
  CreateProgramState
> {
  constructor(props: StoreAndRouterProps) {
    super(props);
    this.state = {
      name: "",
      errorBody: "",
      errorView: false,
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
      if (error.code) {
        this.setState({ errorBody: error.body, errorView: true });
      }
      console.log(error);
    }
  };

  render() {
    return (
      <Container>
        <Row className="justify-content-center m-t-120">
          <Col md={6}>
            <h3>New Program</h3>
            <div className="m-b-30 m-t-50">
              <p>Name:</p>
              <InputGroup className="edit-program-input">
                <FormControl
                  className="mb-3 edit-program-input"
                  placeholder="Enter name of program"
                  onChange={(e) => {
                    this.setState({ name: e.target.value });
                  }}
                />
              </InputGroup>
              {this.state.errorView ? (
                <p className="text-danger">{this.state.errorBody}</p>
              ) : null}
            </div>
            <Button variant="primary" onClick={this.createProgram}>
              Create
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(CreateProgram);
