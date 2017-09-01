import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateForm }from '../actions';

class ElementObserver extends Component {    

  static propTypes = {
    element: PropTypes.object,
    actions: PropTypes.any
  };

  constructor(props) {
      super(props);
      this.state = {caption: ''};
      this.handleChange = this.handleChange.bind(this);
      this.handleSave = this.handleSave.bind(this);
  }

  handleChange(event) {
    this.setState({ caption: event.target.value });
  }

  handleSave(event) {
    let elm = this.props.element;
    if(elm) {
      let elmDef = elm.props.elemDef;
      elmDef.props.caption = this.state.caption;
    }
    elm.forceUpdate();
    this.props.actions.updateForm();
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props.element !== nextProps.element) {
      let elm = nextProps.element;
      if(elm) {
        elm = elm.props.elemDef;
        if(elm) {
          this.setState({caption: elm.props.caption});
          return;
        }
      }
      this.setState({caption: ""});
    }
  }

  render() {
    let elm = this.props.element;
    if ( elm ) {
      elm = elm.props.elemDef;
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

const mapStateToProps = state => ({
    element: state.form.currElement
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({updateForm: updateForm}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ElementObserver);

