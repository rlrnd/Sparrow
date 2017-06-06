import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const FileInfo = ({name}) => (<div>{name}</div>);

FileInfo.propTypes = {
  name: PropTypes.string
}

const mapStateToProps = state => ({
  name: state.file.file.patient.lastName
})

export default connect(
  mapStateToProps
)(FileInfo)
