import _ from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import MetaLabel from '../editors/MetaLabel';
import MetaTextBox from '../editors/MetaTextBox';

class MetaField extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.getRelativePath = this.getRelativePath.bind(this);
    }

    getRelativePath(context, props) {
        let relativePath = props.valuePath;
        let basePath = context.path;
        if(basePath && relativePath.startsWith(basePath)) {
            relativePath = relativePath.substring(basePath.length+1);
        }
        return relativePath;
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        let path = this.getRelativePath(this.context, this.props);
        this.context.actions.updateFile( this.context.data, path, event.target.value);
    }

    render() {
        // let dataType = _.get(this.context.schema, "file." + this.props.valuePath, '');
        let Editor = MetaLabel;
        if(this.props.readonly !== true) {
            Editor = MetaTextBox;
        }
        let path = this.getRelativePath(this.context, this.props);
        let value = _.get(this.context.data, path);
        return (
            <div className="meta-field">
                <div className="meta-field-caption">{this.props.caption}</div>
                <div className="meta-field-editor">
                    <Editor value={value} onChange={this.handleChange} />
                </div>
            </div>
        );
    }

}

MetaField.defaultProps = {
    caption: '',
    value: '',
    dataType: 'text',
    readonly: false
};

MetaField.propTypes = {
    caption: PropTypes.string,
    value: PropTypes.string,
    dataType: PropTypes.string,
    readonly: PropTypes.bool
};

MetaField.contextTypes = {
    data: PropTypes.object,
    schema: PropTypes.object,
    path: PropTypes.string,
    actions: PropTypes.any
};

export default MetaField;