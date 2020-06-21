import React from "react";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { StoreAndRouterProps } from "../../types/props.types";
import { RegistationState } from "../../types/state.types";
import { registrationRequest } from "../../api/auth.api";

@inject("store")
@observer
class Registration extends React.Component<
  StoreAndRouterProps,
  RegistationState
> {
  constructor(props: StoreAndRouterProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      age: 0,
      errorMessage: "",
      errorCode: 0,
    };
  }

  componentDidMount() {
    if (this.props.store.profileStore.isAuth) {
      this.props.history.push("/profile");
    }
  }

  handleInputs = (e: { target: { name: any; value: any } }) => {
    const newState = { [e.target.name]: e.target.value } as Pick<
      RegistationState,
      keyof RegistationState
    >;
    this.setState(newState);
  };

  registration = async () => {
    try {
      await registrationRequest({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        age: this.state.age,
      });
      this.props.history.push({
        pathname: "/login",
        state: `Now you can sign in with email: ${this.state.email}`,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  render() {
    return (
      <div>
        <div>
          <p>Name</p>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputs}
          />
        </div>
        <div>
          <p>Email</p>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputs}
          />
        </div>

        <div>
          <p>Age</p>
          <input
            type="number"
            name="age"
            value={this.state.age}
            onChange={this.handleInputs}
          />
        </div>

        <div>
          <p>Password</p>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputs}
          />
        </div>

        <div>
          <p>Confirm password</p>
          <input
            type="password"
            name="confirmPassword"
            value={this.state.confirmPassword}
            onChange={this.handleInputs}
          />
        </div>

        <button onClick={this.registration}>Sign Out</button>
      </div>
    );
  }
}

export default withRouter(Registration);
