import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MetaForm extends Component {

    getChildContext() {
        return { 
            data: this.props.data, 
            schema: this.props.schema,
            path: '',
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
    actions: PropTypes.any   
};

export default MetaForm;