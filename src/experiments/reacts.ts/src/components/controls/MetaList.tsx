import * as _ from 'lodash';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import MetaListRec from './MetaListRec';
import {combinePath, connectWithPath} from '../../utils';

interface Props {
    caption: string;
    basePath: string;
    path: string;
    data: any;
}

class MetaList extends React.Component<Props, {}> {

    static contextTypes = {
        data: PropTypes.object,
        schema: PropTypes.object,
        path: PropTypes.string
    };

    render() {
        let basePath = this.props.basePath;
        let path = combinePath( basePath, this.props.path);
        let data = this.props.data;
        let schema = this.context.schema;
        let template = this.props.children;
        let children = data.map(function(d: any, i: number) {
            const p = path + '[' + i.toString() + ']';
            return (
                <MetaListRec key={d.id} data={d} schema={schema} path={p} basePath={basePath}>
                    {template}
                </MetaListRec>
            );
        });
        return (
            <div className="meta-list">
                {children}
            </div>
        );
    }
}

function mapStateToProps(state: any, ownProps: any) {
    let data: any = _.get(state.file.file, combinePath(ownProps.basePath, ownProps.path));
    return {data: data};
}

export default connectWithPath(
  mapStateToProps
)(MetaList);