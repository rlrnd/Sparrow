import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fileActions from '../actions';

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

interface Props {
    formDef: any,
    data: any,
    schema: any,
    actions: any
}

class FormLoader extends React.Component<Props, {}> {

    static renderElement(elemDef: any, index: number, formProps: any) : any {
        const elmClass = ElementClassRegistry[elemDef.elmType];
        if(elmClass) {
            let props = {key: index};
            if(elemDef.elmType === "MetaForm") {
                Object.assign(props, { data: formProps.data, schema: formProps.schema, actions: formProps.actions, exprs: elemDef.exprs, path: '' });
            }
            props = Object.assign(props, elemDef.props);
            let children = null;
            if(elemDef.children && elemDef.children.length){
                children = elemDef.children.map(function(c: any, i:number){ 
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


const mapStateToProps = (state:any) => ({
  formDef: state.form.form,
  data: state.file.file,
  schema: state.file.schema.file
});

const mapDispatchToProps = (dispatch:any) => ({
    actions: bindActionCreators(fileActions, dispatch)
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(FormLoader);


