import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as fileActions from '../actions';
import axios from 'axios';

import FileInfo from '../components/FileInfo';
import FileForm from '../components/FileForm';

import MetaForm from '../components/controls/MetaForm';
import MetaSection from '../components/controls/MetaSection';
import MetaField from '../components/controls/MetaField';
import MetaList from '../components/controls/MetaList';

import logo from '../logo.svg';
import './App.css';

class App extends Component {
  static propTypes = {
    file: PropTypes.object,
    schema: PropTypes.object,
    actions: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      formBody: null
    };
  }

  componentWillMount() {
    if(!this.state.formBody) {
      axios.get(`http://localhost:3000/form1.js`)
        .then(response => {
          let stmt = response.data;
          let modules = { React: React, MetaForm: MetaForm, MetaSection: MetaSection, MetaField: MetaField };
          let props = { data: this.props.file, schema: this.props.schema, actions: this.props.actions };
          /*jslint evil: true */
          let f = new Function( "modules", "props", stmt );
          let form1 = f(modules, props);
          this.setState({formBody: form1});
      });
    }
  }

  render() {

    let tempForm = this.state.formBody;

    return (      
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Static MetaForm</h2>
          <h3><FileInfo /></h3>
        </div>
        {tempForm}
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


