import React, {Component} from 'react';

export function withHooks(WrappedRoute, beforeHook = null) {
    return class extends React.Component {
        async componentDidMount() {
            if(beforeHook) {
                await beforeHook();
            }
        }

        render() {
            return (
                <WrappedRoute {...this.props} />
            );
        }
  }
}