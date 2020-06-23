import React from "react";
import { withRouter, Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { NavbarProps } from "../../types/props.types";

@inject("store")
@observer
class Navbar extends React.Component<NavbarProps, {}> {
  componentDidMount() {
    this.getProfile();
  }

  logOut = async () => {
    try {
      await this.props.store?.profileStore.logOut();
      this.props.history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  async getProfile() {
    try {
      await this.props.store?.profileStore.setProfile();
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { store } = this.props;
    const authNavs = (
      <span>
        <li>
          <Link to="/profile">profile</Link>
        </li>

        <li>
          <Link to="/programs">programs</Link>
        </li>

        <li>
          <a onClick={this.logOut} href="#">
            Log Out
          </a>
        </li>

        {store?.profileStore.user?.role.name === "coach" ? (
          <span>
            <li>
              <Link to="/createProgram">Create Program</Link>
            </li>
            <li>
              <Link to="/users/athletes">All Athletes</Link>
            </li>
            <li>
              <Link to="/programs/users">Users with Programs</Link>
            </li>
          </span>
        ) : null}
      </span>
    );

    const noaAuthNavs = (
      <span>
        <li>
          <Link to="/login">Sign In</Link>
        </li>

        <li>
          <Link to="/registration">Sign Out</Link>
        </li>
      </span>
    );

    return (
      <div>
        <ul>
          {store?.profileStore.isAuth ? authNavs : noaAuthNavs}
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(Navbar);
