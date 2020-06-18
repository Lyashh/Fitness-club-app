import React from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Root } from "../../mst/stores/rootStore";

interface NavbarProps extends RouteComponentProps {
  store?: Root;
}

interface NavbarState {}

class Navbar extends React.Component<NavbarProps, NavbarState> {
  constructor(props: NavbarProps) {
    super(props);
  }

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
    return (
      <div>
        <ul>
          <li>
            <Link to="/login">login</Link>
          </li>
          <li>
            <Link to="/profile">profile</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(inject("store")(observer(Navbar)));
