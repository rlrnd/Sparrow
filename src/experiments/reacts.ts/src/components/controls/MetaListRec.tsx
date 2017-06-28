import * as React from 'react';
import * as PropTypes from 'prop-types';

interface Props {
    key: any,
    caption?: string,
    path: string,
    data: any,
    schema: any,
    basePath: any,
    actions: any
}

class MetaListRec extends React.Component<Props,{}> {

    static childContextTypes = {
        data: PropTypes.object,
        schema: PropTypes.object,
        basePath: PropTypes.string,
        actions: PropTypes.any
    }

    getChildContext() {
        return { 
            data: this.props.data, 
            schema: this.props.schema,
            basePath: this.props.path,
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

export default MetaListRec;