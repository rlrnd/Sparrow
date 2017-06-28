import * as React from 'react';
import * as PropTypes from 'prop-types';
import {addExprDef} from '../../selectors';

interface Props {
    caption: string;
    path: string;
    data: object;
    exprs: object[];
    schema: object;
    actions: object;
}

class MetaForm extends React.Component<Props, {}> {

    static childContextTypes = {
        data: PropTypes.object,
        schema: PropTypes.object,
        basePath: PropTypes.string,
        actions: PropTypes.any,
        handlers: PropTypes.any,
        exprs: PropTypes.any
    };
    
    static defaultProps = {
        caption: '',
        path: ''
    };

    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
        let exprs = this.props.exprs;
        if (exprs && exprs.length) {
            exprs.forEach( exprDef => addExprDef(exprDef) );
        }
    }

    getChildContext() {
        return { 
            data: this.props.data, 
            schema: this.props.schema,
            basePath: this.props.path,
            actions: this.props.actions
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