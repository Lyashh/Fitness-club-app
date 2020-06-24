import React from "react";
import { withRouter, Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { StoreAndRouterProps } from "../../types/props.types";

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
      <div>
        <h1>Users with your programs:</h1>
        {usersStore.users.length > 0 ? (
          usersStore.users.map((user, i) => {
            return (
              <div key={i}>
                <p>
                  <Link to={`/users/${user.id}`}>
                    name: {user.name}, id: {user.id}
                  </Link>
                </p>
              </div>
            );
          })
        ) : (
          <p>There are no users with your programs</p>
        )}
      </div>
    );
  }
}

export default withRouter(CoachUsers);
