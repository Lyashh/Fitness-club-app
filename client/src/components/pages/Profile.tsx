import React from "react";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { StoreAndRouterProps } from "../../types/props.types";

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
      <div>
        <p>Profile</p>
        <p>name: {store.profileStore.user?.name}</p>
      </div>
    );
  }
}

export default withRouter(Profile);
