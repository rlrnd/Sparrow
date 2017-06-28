import * as _ from 'lodash';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import {getExpressionSelector} from '../../selectors';
import MetaLabel from '../editors/MetaLabel';
import MetaTextBox from '../editors/MetaTextBox';
import {combinePath, connectWithPath} from '../../utils';

interface Props {
    caption: string,
    value: string,
    valuePath: string,
    basePath: string,
    dataType: string,
    visExpr: string,
    visible: boolean,
    readonly: boolean
}

class MetaField extends React.Component<Props,{}> {

    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    static defaultProps = {
        caption: '',
        value: '',
        visible: true,
        dataType: 'text',
        visExpr: '',
        readonly: false
    }

    static contextTypes = {
        data: PropTypes.object,
        schema: PropTypes.object,
        path: PropTypes.string,
        exprs: PropTypes.any,
        actions: PropTypes.any,
        handlers: PropTypes.any
    }

    handleChange(event: any) {
        this.context.actions.updateFile(combinePath(this.props.basePath, this.props.valuePath), event.target.value);
    }

    render() {
        if (!this.props.visible) {
            return null;
        }
        let Editor = MetaLabel;
        if (this.props.readonly !== true) {
            Editor = MetaTextBox;
        }
        return (
            <div className="meta-field">
                <div className="meta-field-caption">{this.props.caption}</div>
                <div className="meta-field-editor">
                    <Editor value={this.props.value} onChange={this.handleChange}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: any, ownProps:any) {
    let value : any = _.get(state.file.file, combinePath(ownProps.basePath, ownProps.valuePath));
    let visible : any = true;
    if (ownProps.visExpr) {
        visible = getExpressionSelector(ownProps.basePath, ownProps.visExpr)(state);
    }
    return { value : value, visible: visible };
}

export default connectWithPath(
  mapStateToProps
)(MetaField);
