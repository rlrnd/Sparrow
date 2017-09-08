import React from 'react';
import PropTypes from 'prop-types';
import {Observer} from 'mobx-react';


const FileInfo = ({lastName, firstName}) => (<Observer><span>{lastName}, {firstName}</span></Observer>);

FileInfo.propTypes = {
  lastName: PropTypes.string,
  firstName: PropTypes.string
}

export default FileInfo;
