import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import {AsyncRoute} from '../components/AsyncRoute';
import $ from 'jquery';

import Home from './Home';
import FileInfo from '../components/FileInfo';
import RunnerPage from './RunnerPage';
import DesignerPage from './DesignerPage';


import logo from '../logo.svg';
import './App.css';

async function beforeRoute() {
  await fetch("http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=ttc&r=501").then(function(response){
    window["done"] = "yes";
    console.log('1');
  });
}

class App extends Component {

  render() {
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
            <Route exact beforeHook={beforeRoute} path='/' component={Home}/>
            <Route exact path='/loader' component={RunnerPage}/>
            <Route exact path='/designer' component={DesignerPage}/>
          </Switch>          
        </div>
      </div>
    );
  }
}

export default App;
