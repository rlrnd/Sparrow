import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as fileActions from '../actions';

import MetaForm from './controls/MetaForm';
import MetaSection from './controls/MetaSection';
import MetaField from './controls/MetaField';
import MetaList from './controls/MetaList';

const ElementClassRegistry = {
    "MetaForm": MetaForm,
    "MetaSection": MetaSection,
    "MetaField": MetaField,
    "MetaList": MetaList
};


class FormLoader extends Component {

    static renderElement(elemDef, index, formProps) {
        const elmClass = ElementClassRegistry[elemDef.elmType];
        if(elmClass) {
            let props = {key: index};
            if(elemDef.elmType === "MetaForm") {
                Object.assign(props, { data: formProps.data, schema: formProps.schema, actions: formProps.actions, exprs: elemDef.exprs });
            }
            props = Object.assign(props, elemDef.props);
            let children = null;
            if(elemDef.children && elemDef.children.length){
                children = elemDef.children.map(function(c, i){ 
                    return FormLoader.renderElement(c, i, null);
                });
            }
            return React.createElement( elmClass, props, children);
        }
    }

    render() {
        return FormLoader.renderElement(this.props.formDef, 1, this.props);
    }
}

FormLoader.propTypes = {
    formDef: PropTypes.object,
    data: PropTypes.object,
    schema: PropTypes.object,
    actions: PropTypes.any
};

const mapStateToProps = state => ({
  formDef: state.form.form
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(fileActions, dispatch)
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(FormLoader);


