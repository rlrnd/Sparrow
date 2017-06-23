import _ from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MetaListRec from './MetaListRec';
import {combinePath, connectWithPath} from '../../utils';

class MetaList extends Component {

    render() {
        let path = combinePath(this.props.basePath, this.props.path);

        let data = this.props.data;
        let actions = this.context.actions;

        let schema = this.context.schema;
        let template = this.props.children;
        let children = data.map(function(d, i) {
            const p = path + '[' + i.toString() + ']';
            return (<MetaListRec key={d.id} data={d} schema={schema} path={p} actions={actions}>
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

MetaList.defaultProps = {
    caption: ''
};

MetaList.propTypes = {
    caption: PropTypes.string    
};

MetaList.contextTypes = {
    data: PropTypes.object,
    schema: PropTypes.object,
    path: PropTypes.string,
    actions: PropTypes.any
};

function mapStateToProps(state, ownProps) {
    let result = {};
    result.data = _.get(state.file.file, combinePath(ownProps.basePath, ownProps.path));
    return result;
}

export default connectWithPath(
  mapStateToProps
)(MetaList);

