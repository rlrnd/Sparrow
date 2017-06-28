import * as _ from 'lodash';
import * as React from 'react';
import {connect} from 'react-redux';
import FileInfo from '../components/FileInfo';
import FormLoader from '../components/FormLoader';
import ElementObserver from '../components/ElementObserver';

import './App.css';

const logo = require('../logo.svg');

interface Props {
  file: object;
  schema: object;
}

class App extends React.Component <Props, {}> {

  render() {
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

const mapStateToProps = (state: object) => ({
  file: _.get(state, "file.file"),
  schema: _.get(state, "file.schema")
});

export default connect<Props, {}, {}> (
  mapStateToProps
)(App as any);
