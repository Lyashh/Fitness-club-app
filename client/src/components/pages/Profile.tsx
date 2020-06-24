import React from "react";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { StoreAndRouterProps } from "../../types/props.types";
import { Container, Col, Row } from "react-bootstrap";

@inject("store")
@observer
class Profile extends React.Component<StoreAndRouterProps, {}> {
  componentDidMount() {
    this.getProfile();
  }

  async getProfile() {
    try {
      await this.props.store.profileStore.setProfile();
    } catch (e) {
      console.log(e);
      this.props.history.push("/login");
    }
  }

  render() {
    const { store } = this.props;

    return (
      <Container>
        <Row className="m-t-120">
          <Col md="6">
            <img
              className={
                store.profileStore.user?.role.name === "coach"
                  ? "profile-main-coach-pic"
                  : "profile-main-athlete-pic"
              }
            />
          </Col>
          <Col md="6" className="profile-info">
            <h3>{store.profileStore.user?.name}</h3>
            <p>Role: {store.profileStore.user?.role.name}</p>
            <p>Email: {store.profileStore.user?.email}</p>
            <p>Age: {store.profileStore.user?.age}</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Profile);
