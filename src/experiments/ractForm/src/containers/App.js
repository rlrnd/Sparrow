import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import {withHooks} from '../components/AsyncRoute';
import $ from 'jquery';

import Home from './Home';
import FileInfo from '../components/FileInfo';
import RunnerPage from './RunnerPage';
import DesignerPage from './DesignerPage';

import logo from '../logo.svg';
import './App.css';

async function beforeRoute() {
  await fetch("http://www.google.com");
}

class App extends Component {

  render() {
    let AsyncRoute = withHooks(Route,beforeRoute);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Meta-Form Experiments - React</h2>
          <div>
            <FileInfo />&nbsp;|&nbsp;
            <Link to="/">Home</Link>&nbsp;|&nbsp;
            <Link to="/loader">Loader</Link>&nbsp;|&nbsp;
            <Link to="/designer">Designer</Link>
          </div>
        </div>
        <div className="App-body">
          <Switch>
            <AsyncRoute exact path='/' component={Home}/>
            <import path='/loader' component={RunnerPage}/>
            <Route path='/designer' component={DesignerPage}/>
          </Switch>          
        </div>
      </div>
    );
  }
}

export default App;
