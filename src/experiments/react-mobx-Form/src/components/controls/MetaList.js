import _ from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MetaListRec from './MetaListRec';
import {combinePath} from '../../utils';

class MetaList extends Component {

    static propTypes = {
        caption: PropTypes.string    
    };

    static contextTypes = {
        data: PropTypes.object,        
        basePath: PropTypes.string,
        handlers: PropTypes.any
    };

    render() {
        const path = combinePath(this.context.basePath, this.props.valuePath);
        const data = _.get(this.context.data, this.props.valuePath);
        const template = this.props.children;
        const children = data.map(function(d, i) {
            return (<MetaListRec data={d} key={i} path={path}>
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

export default MetaList;

