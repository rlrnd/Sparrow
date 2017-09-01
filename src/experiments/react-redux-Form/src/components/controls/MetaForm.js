import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {addExprDef} from '../../selectors';

class MetaForm extends Component {

    static propTypes = {
        caption: PropTypes.string,
        path: PropTypes.string
    };

    static childContextTypes = {
        basePath: PropTypes.string
    };

    componentWillMount() {
        let exprs = this.props.exprs;
        if(exprs && exprs.length) {
            exprs.forEach( exprDef => addExprDef(exprDef));
        }
    }

    getChildContext() {
        return { 
            basePath: this.props.path
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