import React, {Component} from 'react';
import PropTypes from 'prop-types';

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

class ElementDesigner extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.createInnerElement = this
            .createInnerElement
            .bind(this);
        this.handleClicked = this
            .handleClicked
            .bind(this);
    }

    createInnerElement(elemDef, index, formProps) {
        const elmClass = ElementClassRegistry[elemDef.elmType];
        if (elmClass) {
            let props = {
                key: index
            };
            if (elemDef.elmType === "MetaForm") {
                Object.assign(props, {
                    data: formProps.data,
                    schema: formProps.schema,
                    actions: formProps.actions
                });
            }
            props = Object.assign(props, elemDef.props);
            let children = null;
            if (elemDef.children && elemDef.children.length) {
                children = elemDef
                    .children
                    .map(function (c, i) {
                        return React.createElement(ElementDesigner, {
                            elemDef: c,
                            key: i + 1,
                            keyValue: i + 1
                        }, null);
                    });
            }
            return React.createElement(elmClass, props, children);
        }
    }

    handleClicked(event) {
        event.stopPropagation();
        this
            .context
            .actions
            .elementSelected(this.props.elemDef);
        // set state to have the red border?
    }

    render() {
        const innerElement = this.createInnerElement(this.props.elemDef, this.props.keyValue, this.props.context);
        return (
            <div className="js" key={this.props.keyValue} onClick={this.handleClicked}>{innerElement}</div>
        );
    }
}

ElementDesigner.propTypes = {
    elemDef: PropTypes.object,
    keyValue: PropTypes.number,
    context: PropTypes.object
};

ElementDesigner.contextTypes = {
    actions: PropTypes.any
};

export default ElementDesigner;