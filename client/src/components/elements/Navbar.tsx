import React from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Root } from "../../mst/stores/rootStore";

interface NavbarProps extends RouteComponentProps {
  store?: Root;
}

interface NavbarState {}

@inject("store")
@observer
class Navbar extends React.Component<NavbarProps, NavbarState> {
  componentDidMount() {
    this.getProfile();
  }

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
