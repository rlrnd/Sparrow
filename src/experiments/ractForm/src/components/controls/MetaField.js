import _ from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getExpressionSelector} from '../../selectors';
import MetaLabel from '../editors/MetaLabel';
import MetaTextBox from '../editors/MetaTextBox';
import {combinePath, connectWithPath} from '../../utils';
import { bindActionCreators } from 'redux';
import { updateFile } from '../../actions';

class MetaField extends Component {

    static propTypes = {
        caption: PropTypes.string,
        value: PropTypes.string,
        valuePath: PropTypes.string,
        basePath: PropTypes.string,
        dataType: PropTypes.string,
        visExpr: PropTypes.string,
        visible: PropTypes.bool,
        readonly: PropTypes.bool,
        actions: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.actions.updateFile(combinePath(this.props.basePath, this.props.valuePath), event.target.value);
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

function mapStateToProps(state, ownProps) {
    const value = _.get(state.file.file, combinePath(ownProps.basePath, ownProps.valuePath));
    const visible = (ownProps.visExpr)?getExpressionSelector(ownProps.basePath, ownProps.visExpr)(state):true;
    return { value: value, visible: visible };
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({updateFile: updateFile}, dispatch)
});

export default connectWithPath(
  mapStateToProps, mapDispatchToProps
)(MetaField);
