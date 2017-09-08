import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MetaListRec extends Component {

    static propTypes = {
        caption: PropTypes.string,
        path: PropTypes.string,
    };

    static contextTypes = {
        data: PropTypes.object,        
        basePath: PropTypes.string,
        handlers: PropTypes.any
    };

    static childContextTypes = {
        data: PropTypes.object,
        basePath: PropTypes.string,
        handlers: PropTypes.any
    };

    getChildContext() {
        return { 
            data: this.props.data,
            handlers: this.context.handlers,
            basePath: this.props.path
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

export default MetaListRec;