import _ from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MetaListRec from './MetaListRec';


class MetaList extends Component {

    render() {
        let path = this.props.path;
        let relativePath = path;
        let basePath = this.context.path;
        if(basePath && relativePath.startsWith(basePath)) {
            relativePath = relativePath.substring(basePath.length+1);
        }

        let data = _.get(this.context.data, relativePath, []);
        let actions = this.context.actions;

        let schema = this.context.schema;
        let template = this.props.children;
        let children = data.map((d)=>
            <MetaListRec key={d.id} data={d} schema={schema} path={path} actions={actions}>
                {template}
            </MetaListRec>
        );
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

export default MetaList;