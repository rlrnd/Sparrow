import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MetaListRec extends Component {

    static propTypes = {
        caption: PropTypes.string,
        path: PropTypes.string,
    };

    static childContextTypes = {
        basePath: PropTypes.string
    };

    getChildContext() {
        return { 
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