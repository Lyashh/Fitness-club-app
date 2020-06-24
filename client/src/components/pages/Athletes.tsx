import React from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { AthletesState } from "../../types/state.types";
import { athleteRequest } from "../../api/user.api";
import { Container, Row, Col } from "react-bootstrap";

class Athletes extends React.Component<RouteComponentProps, AthletesState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      users: [],
    };
  }
  async componentDidMount() {
    try {
      let { data } = await athleteRequest();
      data = data.map((user: any) => {
        user.programs = [];
        return user;
      });
      this.setState({ users: data });
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        this.props.history.push("/login");
      } else if (error.response.status === 403) {
        this.props.history.push("/profile");
      }
    }
  }

  render() {
    return (
      <Container className="m-t-30">
        <Row>
          <Col md={7}>
            <h3 className="m-b-20">List of Athletes:</h3>
            <Row>
              {this.state.users.map((user, i) => {
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
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Athletes);
