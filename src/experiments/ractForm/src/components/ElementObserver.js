import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as fileActions from '../actions';

class ElementObserver extends Component {    

  constructor(props) {
      super(props);
        this.state = {
          caption: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
  }

  handleChange(event) {
    this.setState({ caption: event.target.value });
  }

  handleSave(event) {
    let elm = this.props.element;
    if(elm) {
      elm.props.caption = this.state.caption;
    }
    this.context.actions.updateForm();
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props.element !== nextProps.element) {
      const elm = nextProps.element;
      if(elm) {
        this.setState({caption: elm.props.caption});
      }
      else {
        this.setState({caption: ""});
      }
    }
  }

  render() {
    const elm = this.props.element;
    if ( elm ) {
      return ( 
        <dl>
          <dt>type</dt>
          <dd>{elm.elmType}</dd>
          <dt>caption</dt>
          <dd><input type="text" value={this.state.caption} onChange={this.handleChange} /></dd>
          <dt>&nbsp;</dt>
          <dd><button type="button" onClick={this.handleSave}>Set</button></dd>
        </dl>
      );
    }
    else {
      return (<div>nothing</div>);
    }
  }
}

ElementObserver.propTypes = {
  element: PropTypes.object
};

ElementObserver.contextTypes = {
    actions: PropTypes.any
};

const mapStateToProps = state => ({
  element: state.form.currElement
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(fileActions, dispatch)
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(ElementObserver);

