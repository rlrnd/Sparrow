import React from 'react';
import AbstractEditor from './AbstractEditor';

class MetaLabel extends AbstractEditor {

  render() {
    return (
      <label>{this.props.value}</label>
    );
  }
}

export default MetaLabel;
