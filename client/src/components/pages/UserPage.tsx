import React from "react";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { StoreRouterIdParam } from "../../types/props.types";
import UserProgram from "../elements/UserProgram";
import AvailableProgram from "../elements/AvailablePrograms";
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
class UserPage extends React.Component<StoreRouterIdParam, {}> {
  constructor(props: StoreRouterIdParam) {
    super(props);
  }

  async componentDidMount() {
    try {
      await this.props.store.currentUserStore.clear();
      await this.props.store.programStore.clear();

      await this.props.store.currentUserStore.getUser(
        parseInt(this.props.match.params.id)
      );
      await this.props.store.programStore.setPrograms();
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

  backToUsersList = () => {
    this.props.history.push("/users/athletes");
  };

  render() {
    const { user } = this.props.store.currentUserStore;
    const { programStore } = this.props.store;

    const userInfo = (
      <div>
        <h3 className="m-b-30">{user.name}</h3>
        <p>Age {user.age}</p>
        <p>Email: {user.email}</p>
      </div>
    );

    const userPrograms = (
      <Col md={5}>
        <h4>User's Programs:</h4>
        {user.programs?.map((program, i) => {
          return <UserProgram key={i} name={program.name} id={program.id} />;
        })}
      </Col>
    );

    const availablePrograms = (
      <Col md={5}>
        <h4>Available Programs:</h4>
        {programStore.programsThatNotAssign().map((program, i) => {
          return (
            <AvailableProgram id={program.id} name={program.name} key={i} />
          );
        })}
      </Col>
    );

    const main = (
      <Container className="m-t-30">
        <Row>
          <Col md={12} className="m-b-50">
            <Button variant="primary" onClick={this.backToUsersList}>
              {" "}
              {"Back"}
            </Button>
          </Col>
          <Col md={6}>{userInfo}</Col>
          <Col md={6}>
            <img className="profile-main-athlete-pic float-r" />
          </Col>
          <Col md={12} className="m-t-70 m-b-50">
            <Row className="justify-content-between">
              {userPrograms} {availablePrograms}
            </Row>
          </Col>
        </Row>
      </Container>
    );

    return <div>{user.id > 0 ? main : <p>Loading...</p>}</div>;
  }
}

export default withRouter(UserPage);
