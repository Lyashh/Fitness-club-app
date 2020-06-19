import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Navbar from "./elements/Navbar";
import Programs from "./pages/Programs";
import CreateProgram from "./pages/CreateProgram";
import ProgramPage from "./pages/ProgramPage";
import NotFound from "./pages/404";
import EditProgram from "./pages/EditProgram";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/programs" exact component={Programs} />
          <Route path="/programs/:id/edit" exact component={EditProgram} />
          <Route path="/programs/:id" exact component={ProgramPage} />
          <Route path="/createProgram" exact component={CreateProgram} />
          <Route path="/notFound" exact component={NotFound} />
          <Route path="*" exact component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
