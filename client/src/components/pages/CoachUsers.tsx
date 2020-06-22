import React from "react";
import { withRouter } from "react-router-dom";
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
      await this.props.store.usersStore.getCoachUsers();
    } catch (error) {
      console.log(error);
      this.props.history.push("/login");
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
                  name: {user.name}, id: {user.id}
                </p>
              </div>
            );
          })
        ) : (
          <p>You dont have programs</p>
        )}
      </div>
    );
  }
}

export default withRouter(CoachUsers);
