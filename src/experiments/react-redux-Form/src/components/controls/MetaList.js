import _ from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MetaListRec from './MetaListRec';
import {combinePath, connectWithPath} from '../../utils';

class MetaList extends Component {

    static propTypes = {
        caption: PropTypes.string    
    };

    static contextTypes = {
        path: PropTypes.string
    };

    render() {
        const path = combinePath(this.props.basePath, this.props.path);
        const data = this.props.data;
        const template = this.props.children;
        const children = data.map(function(d, i) {
            const p = `${path}[${i}]`;
            return (<MetaListRec key={d.id} path={p}>
                {template}
            </MetaListRec>);
        });
        return (
            <div className="meta-list">
                {children}
            </div>
        );

    }
}

function mapStateToProps(state, ownProps) {
    let result = {};
    result.data = _.get(state.file.file, combinePath(ownProps.basePath, ownProps.path));
    return result;
}

export default connectWithPath(
  mapStateToProps
)(MetaList);

