import * as React from 'react';
import * as PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import fileActions from '../actions';
import FileInfo from '../components/FileInfo';
import FormLoader from '../components/FormLoader';
import ElementObserver from '../components/ElementObserver';

import './App.css';

const logo = require('../logo.svg');

interface Props {
  file: any;
  schema: any;
  actions: any;
}

class App extends React.Component <Props, {}> {

  static childContextTypes = {
    actions: PropTypes.any
  };

  getChildContext() {
    return {actions: this.props.actions};
  }

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

const mapStateToProps = (state: any) => ({
  file: state.file.file,
  schema: state.file.schema
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(fileActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
