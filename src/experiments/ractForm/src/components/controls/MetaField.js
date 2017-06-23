import _ from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getExpressionSelector} from '../../selectors';
import MetaLabel from '../editors/MetaLabel';
import MetaTextBox from '../editors/MetaTextBox';
import {combinePath, connectWithPath} from '../../utils';

class MetaField extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
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

MetaField.defaultProps = {
    caption: '',
    value: '',
    visible: true,
    dataType: 'text',
    visExpr: '',
    readonly: false
};

MetaField.propTypes = {
    caption: PropTypes.string,
    value: PropTypes.string,
    valuePath: PropTypes.string,
    basePath: PropTypes.string,
    dataType: PropTypes.string,
    visExpr: PropTypes.string,
    visible: PropTypes.bool,
    readonly: PropTypes.bool
};

MetaField.contextTypes = {
    data: PropTypes.object,
    schema: PropTypes.object,
    path: PropTypes.string,
    exprs: PropTypes.any,
    actions: PropTypes.any,
    handlers: PropTypes.any
};

function mapStateToProps(state, ownProps) {
    let result = {};
    result.value = _.get(state.file.file, combinePath(ownProps.basePath, ownProps.valuePath));
    if (ownProps.visExpr) {
        result.visible = getExpressionSelector(ownProps.basePath, ownProps.visExpr)(state);
    }
    return result;
}

export default connectWithPath(
  mapStateToProps
)(MetaField);
