import React from "react";
import { withRouter, Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { StoreAndRouterProps } from "../../types/props.types";
import { Container, Row, Col } from "react-bootstrap";

@inject("store")
@observer
class CoachUsers extends React.Component<StoreAndRouterProps, {}> {
  componentDidMount() {
    this.setUsers();
  }

  async setUsers() {
    try {
      await this.props.store.usersStore.clear();
      await this.props.store.usersStore.getCoachUsers();
    } catch (error) {
      console.log(error);
      if (error.code === 401) {
        this.props.history.push("/login");
      } else if (error.code === 403) {
        this.props.history.push("/profile");
      }
    }
  }

  render() {
    const { usersStore } = this.props.store;
    return (
      <Container className="m-t-30">
        <Row>
          <Col md={7}>
            <h3>List of users with your programs:</h3>
            {usersStore.users.length > 0 ? (
              usersStore.users.map((user, i) => {
                return (
                  <Col md={12} className="user-list-col">
                    <Link
                      to={`/users/${user.id}`}
                      key={i}
                      className="list-link"
                    >
                      <div className="user-list-item">
                        <div className="align-verical">
                          <img className="athelete-list-icon" />
                          <span>{`${++i}. ${user.name}`}</span>
                        </div>
                      </div>
                    </Link>
                  </Col>
                );
              })
            ) : (
              <p>There are no users with your programs</p>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(CoachUsers);
