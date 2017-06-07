import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as fileActions from '../actions';

import FileInfo from '../components/FileInfo';
import FormLoader from '../components/FormLoader';
import FormDesigner from '../components/FormDesigner';
import ElementObserver from '../components/ElementObserver';

import logo from '../logo.svg';
import './App.css';

class App extends Component {

  static propTypes = {
    file: PropTypes.object,
    schema: PropTypes.object,
    actions: PropTypes.object.isRequired
  }

  static childContextTypes = {
    actions: PropTypes.any   
  }

   getChildContext() {
        return { 
            actions: this.props.actions
        };
    }

  render() {
    //<FormLoader data={this.props.file} schema={this.props.schema} actions={this.props.actions}  />      
    return (      
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Static MetaForm</h2>
          <h3><FileInfo /></h3>
        </div>
        <div className="App-body">
          <div className="Form-designer">
            <FormDesigner data={this.props.file} schema={this.props.schema} />      
          </div>
          <div className="Form-observer">
            <ElementObserver />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  file: state.file.file,
  schema: state.file.schema
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(fileActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)


