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

    return (
      <div>
        <ul>
          {store?.profileStore.isAuth ? (
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
                <li>
                  <Link to="/createProgram">Create Program</Link>
                </li>
              ) : null}
            </span>
          ) : (
            <li>
              <Link to="/login">login</Link>
            </li>
          )}

          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(Navbar);
