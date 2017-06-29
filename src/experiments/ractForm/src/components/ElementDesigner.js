import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { elementSelected } from '../actions';


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

    static propTypes = {
        elemDef: PropTypes.object,
        keyValue: PropTypes.number,
        actions: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.createInnerElement = this.createInnerElement.bind(this);
        this.handleClicked = this.handleClicked.bind(this);
    }

    createInnerElement(elemDef, index, formProps) {
        const elmClass = ElementClassRegistry[elemDef.elmType];
        if (elmClass) {
            let props = {key: index};
            if (elemDef.elmType === "MetaForm") {
                Object.assign(props, {
                    exprs: elemDef.exprs, path: ''
                });
            }
            props = Object.assign(props, elemDef.props);
            let children = null;
            if (elemDef.children && elemDef.children.length) {
                children = elemDef.children.map(function (c, i) {
                    return React.createElement(FormalElementDesigner, {
                        elemDef: c,
                        key: i + 1,
                        keyValue: i + 1
                    });
                });
            }
            return React.createElement(elmClass, props, children);
        }
    }

    handleClicked(event) {
        event.stopPropagation();
        this.props.actions.elementSelected(this);
    }

    render() {
        const innerElement = this.createInnerElement(this.props.elemDef, this.props.keyValue);
        return (
            <div className="js" key={this.props.keyValue} onClick={this.handleClicked}>{innerElement}</div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({elementSelected: elementSelected}, dispatch)
});

const FormalElementDesigner = connect(null, mapDispatchToProps)(ElementDesigner);
export default FormalElementDesigner;
