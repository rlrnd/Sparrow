import * as React from 'react';
import * as PropTypes from 'prop-types';

interface Props {
    key: any;
    caption?: string;
    path: string;
    data: any;
    schema: any;
    basePath: any;
}

class MetaListRec extends React.Component<Props, {}> {

    static childContextTypes = {
        data: PropTypes.object,
        schema: PropTypes.object,
        basePath: PropTypes.string
    };

    getChildContext() {
        return { 
            data: this.props.data, 
            schema: this.props.schema,
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