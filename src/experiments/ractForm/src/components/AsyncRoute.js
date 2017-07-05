import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Link} from 'react-router-dom';

export class AsyncRoute extends Route {
    static propTypes = {
        beforeHook: PropTypes.func
    };

    async componentWillMount() {
        console.log("1.1");
        if(this.props.beforeHook) {
            await this.props.beforeHook();
        }
    }

    render() {
        console.log("2");
        return super.render();
    }

}
