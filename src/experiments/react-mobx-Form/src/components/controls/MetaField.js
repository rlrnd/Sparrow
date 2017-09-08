import _ from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer} from "mobx-react";
import MetaLabel from '../editors/MetaLabel';
import MetaTextBox from '../editors/MetaTextBox';
import {toRelativePath} from '../../utils';

class MetaField extends Component {

    static propTypes = {
        caption: PropTypes.string,
        value: PropTypes.string,
        valuePath: PropTypes.string,
        dataType: PropTypes.string,
        visExpr: PropTypes.string,
        visPath: PropTypes.string,
        readonly: PropTypes.bool,
        actions: PropTypes.object
    };

    static contextTypes = {
        data: PropTypes.object,        
        basePath: PropTypes.string,
        handlers: PropTypes.any
    };

    constructor(props) {
        super(props);
        this.state = {visPath: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        const visExpr = this.props.visExpr;
        if(visExpr) {
            this.setState({visPath: this.context.handlers.registerExpression(this.context.data, this.props.basePath, visExpr)});
        }
    }

    handleChange(event) {
        const path = toRelativePath(this.context.basePath, this.props.valuePath);
        this.context.handlers.updateProperty( this.context.data, path, event.target.value);
    }

    render() {
        let visible = true;
        if(this.state.visPath) {
            visible = _.get(this.context.data, this.state.visPath);
        }
        if(visible) {
            const path = toRelativePath(this.context.basePath, this.props.valuePath);
            const value = _.get(this.context.data, path);
            let Editor = MetaLabel;
            if (this.props.readonly !== true) {
                Editor = MetaTextBox;
            }
            return (
                <div className="meta-field">
                    <div className="meta-field-caption">{this.props.caption}</div>
                    <div className="meta-field-editor">
                        <Editor value={value} onChange={this.handleChange}/>
                    </div>
                </div>
            );
        }
        else {
            return null;
        }
    }
}

export default observer(MetaField);
