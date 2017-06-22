import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {createExpressionSelector} from '../../selectors';

class MetaForm extends Component {

     constructor(props) {
        super(props);
        this.exprs = {};
    }

    componentWillMount() {
        let exprs = this.props.exprs;
        if(exprs && exprs.length) {
            exprs.forEach( exprDef => createExpressionSelector(exprDef));
        }
    }

    getChildContext() {
        return { 
            data: this.props.data, 
            schema: this.props.schema,
            path: '',
            actions: this.props.actions,
            exprs: this.exprs, 
            handlers: {
                resolveExpression: this.resolveExpression
            }
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

MetaForm.defaultProps = {
    caption: ''
};

MetaForm.propTypes = {
    caption: PropTypes.string    
};

MetaForm.childContextTypes = {
    data: PropTypes.object,
    schema: PropTypes.object,
    path: PropTypes.string,
    actions: PropTypes.any,
    handlers: PropTypes.any,
    exprs: PropTypes.any
};

export default MetaForm;