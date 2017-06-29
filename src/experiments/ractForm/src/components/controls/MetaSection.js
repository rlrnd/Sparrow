import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MetaSection extends Component {

    static propTypes = {
        caption: PropTypes.string,
    };

    render() {
        return (
            <div className="meta-section">
                { this.props.caption && 
                  <div className="meta-section-header">{this.props.caption}</div>
                }
                <div className="meta-section-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default MetaSection;