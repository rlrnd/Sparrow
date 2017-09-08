import { Component } from 'react';
import PropTypes from 'prop-types';

class AbstractEditor extends Component {
  static propTypes = {
      value: PropTypes.string
  };
}

export default AbstractEditor;
