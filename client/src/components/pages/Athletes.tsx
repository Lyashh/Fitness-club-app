import React from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { AthletesState } from "../../types/state.types";
import { athleteRequest } from "../../api/user.api";

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
    }
  }

  render() {
    return (
      <div>
        {this.state.users.map((user, i) => {
          return (
            <Link to={`/users/${user.id}`}>
              <h2>{`${++i}. ${user.name}`}</h2>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default withRouter(Athletes);
