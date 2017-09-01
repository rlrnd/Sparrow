import React, { Component } from 'react';
import {Observer} from 'mobx-react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          {this.props.person.fullName}
          <Observer>
            {() => <div>{this.props.person.fullName}|{this.props.person.age}|{this.props.person.isFather}</div>}
          </Observer>
        </div>
      </div>
    );
  }
}

export default App;
