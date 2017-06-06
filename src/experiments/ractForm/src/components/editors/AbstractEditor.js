import { Component } from 'react';
import PropTypes from 'prop-types';

class AbstractEditor extends Component {
}

AbstractEditor.defaultProps = {
  value: ''
};

AbstractEditor.propTypes = {
    value: PropTypes.string
};

export default AbstractEditor;
