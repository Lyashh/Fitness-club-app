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
      <div>
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
      </div>
    );

    return (
      <Container>
        <Row>
          <Col md={6} className="m-t-120">
            <h2>Fitnes App</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
              sit. At voluptas ex temporibus minus. Dolorem, iure! Odio sapiente
              natus aliquid a eius sequi quam quia est accusantium, voluptatem
              eos.
            </p>
            {this.props.store.profileStore.isAuth ? null : authButtons}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Home);
