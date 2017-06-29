import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose, getContext} from 'recompose';

export function combinePath(basePath, valuePath) {
    if (!basePath) { 
        return valuePath;
    }
    else {
        let baseParts = basePath.split('.');
        let valueParts = valuePath.split('.');
        let results = [];

        for (let i = 0; i < baseParts.length; i++) {
            let basePart = baseParts[i].replace(/\[\d\]/g, "");
            let valuePart = valueParts[0];
            if (basePart !== valuePart) {
                break;
            }
            results.push(baseParts[i]);
            valueParts.splice(0, 1);
            if (valueParts.length === 0) {
                break;
            }
        }
        results.push(...valueParts);
        return results.join(".");
    }
}

export function connectWithPath(...args) {
    return compose(getContext({basePath: PropTypes.string}), connect(...args));
}