import React, {Component} from "react";
import {Switch, Route, Link} from "react-router-dom";

import Home from "./Home";
import RunnerPage from "./RunnerPage";
import DesignerPage from "./DesignerPage";
import StaticPage from "./StaticPage";

import logo from "../logo.svg";
import "./App.css";

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Meta-Form Experiments - React</h2>
          <div>
            <Link to="/">Home</Link>&nbsp;|&nbsp;
            <Link to="/static">Static</Link>&nbsp;|&nbsp;
            <Link to="/loader">Loader</Link>&nbsp;|&nbsp;
            <Link to="/designer">Designer</Link>
          </div>
        </div>
        <div className="App-body">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/static" component={StaticPage} />
            <Route exact path="/loader" component={RunnerPage} />
            <Route exact path="/designer" component={DesignerPage} />
          </Switch>          
        </div>
      </div>
    );
  }
}

export default App;
