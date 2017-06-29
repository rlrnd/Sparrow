import React, {Component} from 'react';

import FileInfo from '../components/FileInfo';
import FormLoader from '../components/FormLoader';
import FormDesigner from '../components/FormDesigner';
import ElementObserver from '../components/ElementObserver';

import logo from '../logo.svg';
import './App.css';

class App extends Component {

  render() {
    //<FormDesigner data={this.props.file} schema={this.props.schema} />
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Static MetaForm</h2>
          <h3><FileInfo/></h3>
        </div>
        <div className="App-body">
          <div className="Form-designer">
            <FormLoader />
          </div>
          <div className="Form-observer">
            <ElementObserver/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
