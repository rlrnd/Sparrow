import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose, getContext} from 'recompose';

export function combinePath(basePath, valuePath) {
    if(!basePath) return valuePath;

    let simpPath = basePath.replace(/\[\d\]/g, "");
    if (valuePath.startsWith(simpPath)) {
        valuePath = valuePath.substring(simpPath.length);
        return basePath+valuePath;
    }
    else {
        return valuePath;
    }
}

export function connectWithPath(...args) {
    return compose(
        getContext({basePath: PropTypes.string}),
        connect(...args)
    );
}