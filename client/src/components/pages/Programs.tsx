import React from "react";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import Program from "../elements/ProgramInList";
import { StoreAndRouterProps } from "../../types/props.types";
import { Container, Row, Col } from "react-bootstrap";

@inject("store")
@observer
class Programs extends React.Component<StoreAndRouterProps, {}> {
  componentDidMount() {
    this.setPrograms();
  }

  async setPrograms() {
    try {
      await this.props.store.programStore.clear();
      await this.props.store.programStore.setPrograms();
    } catch (error) {
      console.log(error);
      this.props.history.push("/login");
    }
  }

  render() {
    const { store } = this.props;
    return (
      <Container className="m-t-70">
        <Row>
          <Col md={12}>
            <h3 className="m-b-30">Your programs:</h3>

            {store.programStore.programs.length > 0 ? (
              store.programStore.programs.map((program, i) => {
                return (
                  <Program key={i} program={program} countList={++i}></Program>
                );
              })
            ) : (
              <p>You dont have programs</p>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Programs);
