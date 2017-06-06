import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MetaListRec extends Component {

    getChildContext() {
        return { 
            data: this.props.data, 
            schema: this.props.schema,
            path: this.props.path,
            actions: this.props.actions
        };
    }

    render() {
        return (
            <div className="meta-list-rec">
                {this.props.children}
            </div>
        );       
    }

}

MetaListRec.defaultProps = {
    caption: ''
};

MetaListRec.propTypes = {
    caption: PropTypes.string    
};

MetaListRec.childContextTypes = {
    data: PropTypes.object,
    schema: PropTypes.object,
    path: PropTypes.string,
    actions: PropTypes.any
};

export default MetaListRec;