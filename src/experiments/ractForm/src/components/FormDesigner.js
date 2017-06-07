import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as fileActions from '../actions';
import ElementDesigner from './ElementDesigner';

class FormDesigner extends Component {    

    render() {
        let context = {
            data: this.props.data,
            schema: this.props.schema,
            actions: this.props.actions
        };
        return (
            <div>{this.props.formVersion}
            <ElementDesigner elemDef={this.props.formDef} key={1} context={context} />
            </div>
        );
    }
}

FormDesigner.propTypes = {
    formDef: PropTypes.object,
    formVersion: PropTypes.number,
    data: PropTypes.object,
    schema: PropTypes.object,
    actions: PropTypes.any
};


const mapStateToProps = state => ({
  formDef: state.form.form,
  formVersion: state.form.formVersion
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(fileActions, dispatch)
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(FormDesigner);

