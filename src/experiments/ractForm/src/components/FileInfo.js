import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const FileInfo = ({lastName, firstName}) => (<div>{lastName}, {firstName}</div>);

FileInfo.propTypes = {
  lastName: PropTypes.string,
  firstName: PropTypes.string
}

const mapStateToProps = state => ({
  lastName: state.file.file.patient.lastName,
  firstName: state.file.file.patient.firstName
})

export default connect(
  mapStateToProps
)(FileInfo)
