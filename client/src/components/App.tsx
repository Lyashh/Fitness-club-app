import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Navbar from "./elements/Navbar";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/profile" exact component={Profile} />
        </Switch>
      </Router>
    );
  }
}

export default App;
