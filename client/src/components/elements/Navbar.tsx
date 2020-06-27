import React from "react";
import { withRouter, Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { NavbarProps } from "../../types/props.types";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavbarState } from "../../types/state.types";

@inject("store")
@observer
class NavbarCpmponent extends React.Component<NavbarProps, NavbarState> {
  constructor(props: NavbarProps) {
    super(props);
    this.state = {
      authGeneralNavs: [
        { name: "Create Program", link: "/createProgram", coach: true },
        { name: "Athletes List", link: "/users/athletes", coach: true },
        { name: "My Athletes", link: "/programs/users", coach: true },
      ],
    };
  }
  componentDidMount() {
    this.getProfile();
  }

  logOut = async () => {
    try {
      await this.props.store?.profileStore.logOut();
      this.props.history.push("/");
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

    const noaAuthNavs = (
      <span>
        <NavDropdown.Item>
          <Link to="/login">Sign In</Link>
        </NavDropdown.Item>
        <NavDropdown.Item>
          <Link to="/registration">Sign Out</Link>
        </NavDropdown.Item>
      </span>
    );

    const authNavs = (
      <span>
        <Link to="/profile" className="dropdown-item" role="button">
          {store?.profileStore.user?.name}
        </Link>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={this.logOut}>Log Out</NavDropdown.Item>
      </span>
    );

    const generalNav = (
      <Link to="/programs" className="nav-link" key={"programs"}>
        My Programs
      </Link>
    );

    const coachNavs = this.state.authGeneralNavs.map((navItem, i) => {
      return (
        <Link to={navItem.link} className="nav-link" key={navItem.name}>
          {navItem.name}
        </Link>
      );
    });

    const navs =
      store?.profileStore.user?.role.name === "coach"
        ? [...coachNavs, generalNav]
        : generalNav;

    return (
      <Navbar
        collapseOnSelect
        expand="sm"
        bg="dark"
        variant="dark"
        className="navbar-wrap"
      >
        <Link to="/" className="navbar-brand">
          Fitnes App
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {store?.profileStore.isAuth ? navs : null}
          </Nav>
          <Nav>
            <NavDropdown
              title={store?.profileStore.isAuth ? "Profile" : "Sign In/Out"}
              id="collasible-nav-dropdown"
            >
              {store?.profileStore.isAuth ? authNavs : noaAuthNavs}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(NavbarCpmponent);
