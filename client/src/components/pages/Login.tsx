import React from "react";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { StoreAndRouterProps } from "../../types/props.types";
import { LoginState } from "../../types/state.types";

@inject("store")
@observer
class Login extends React.Component<StoreAndRouterProps, LoginState> {
  constructor(props: StoreAndRouterProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
      errorCode: 0,
    };
  }
  componentDidMount() {
    this.getProfile();
  }

  login = async () => {
    try {
      await this.props.store.profileStore.setLogin(
        this.state.email,
        this.state.password
      );
      this.props.history.push("/profile");
    } catch (e) {
      if (e.message) {
        this.setState({ errorMessage: e.message, errorCode: e.code });
      } else {
        console.log(e);
      }
    }
  };

  getProfile = async () => {
    try {
      await this.props.store.profileStore.setProfile();
      this.props.history.push("/profile");
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>
        <p>Error: {this.state.errorMessage}</p>
        <p>Code: {this.state.errorCode}</p>
        <button onClick={this.login}>Submit</button>
      </div>
    );
  }
}

export default withRouter(Login);
