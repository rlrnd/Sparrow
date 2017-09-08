import React from 'react';
import AbstractEditor from './AbstractEditor';
import PropTypes from 'prop-types';

class MetaTextBox extends AbstractEditor {

  static propTypes = {
      value: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
     if(this.props.onChange) {
       this.props.onChange(event);
     }
  }

  render() {
    return (
      <input type="text" value={this.props.value} onChange={this.handleChange} />
    );
  }
}

export default MetaTextBox;
