import React, {Component} from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {extendObservable, computed} from 'mobx';
import {hashString} from "../../utils";

class MetaForm extends Component {

    static childContextTypes = {
        data: PropTypes.object,
        basePath: PropTypes.string,
        handlers: PropTypes.any,
        exprs: PropTypes.any
    };

    static propTypes = {
        caption: PropTypes.string,
        path: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.updateProperty = this.updateProperty.bind(this);
        this.registerExpression = this.registerExpression.bind(this);
    }

    updateProperty(data, path, value) {
        _.set(data, path, value);
    }

    registerExpression(data, basePath, expression) {
        const exprId = "exp"+hashString(expression);
        let result = _.get(data, exprId );
        if(!result) {
            let baseMark = "@.";
            if(basePath) {
                baseMark += basePath;
            }
            const stmt = expression.replace(baseMark, "this.");
            // eslint-disable-next-line
            const propFunc = new Function("return (" + stmt + ");");
            const addObj = {};
            _.set(addObj, exprId, computed(propFunc));
            extendObservable(data, addObj);
        }
        return exprId;
    }

    componentWillMount() {
        /*let exprs = this.props.exprs;
        if(exprs && exprs.length) {
            exprs.forEach( exprDef => addExprDef(exprDef));
        }*/
    }

    getChildContext() {
        return { 
            data: this.props.data,
            handlers: {
                updateProperty: this.updateProperty,
                registerExpression: this.registerExpression
            },
            basePath: ""
        };
    }

    render() {
        return (
            <div className="meta-form">
                { this.props.caption && 
                  <div className="meta-form-header">{this.props.caption}</div>
                }
                <div className="meta-form-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default MetaForm;