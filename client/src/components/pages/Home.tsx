import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { inject, observer } from "mobx-react";
import { StoreAndRouterProps } from "../../types/props.types";
import { withRouter } from "react-router-dom";

@inject("store")
@observer
class Home extends React.Component<StoreAndRouterProps, {}> {
  render() {
    const authButtons = (
      <Col md={12} className="m-t-30">
        <Button
          variant="primary"
          className="m-r-20"
          onClick={() => this.props.history.push("/login")}
        >
          Sign In
        </Button>
        <Button
          variant="primary"
          className="m-r-20"
          onClick={() => this.props.history.push("/registration")}
        >
          Sign Out
        </Button>
      </Col>
    );

    return (
      <Container>
        <Row>
          <Col md={6} className="m-t-120">
            <Row>
              <Col md={12}>
                <h2>Fitnes App</h2>
                <p className="t-a-just m-t-30">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Suscipit, sit. At voluptas ex temporibus minus. Dolorem, iure!
                  Odio sapiente natus aliquid a eius sequi quam quia est
                  accusantium, voluptatem eos.
                </p>
              </Col>
              {this.props.store.profileStore.isAuth ? null : authButtons}
            </Row>
          </Col>

          <Col md={6} className="t-a-cen m-t-120">
            <img className="home-main-img" />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Home);
