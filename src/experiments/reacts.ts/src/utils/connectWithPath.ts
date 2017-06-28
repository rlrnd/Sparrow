import * as PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose, getContext} from 'recompose';

export function connectWithPath(mapStateToProps: any, mapDispatchToProps?: any) {
    return compose(getContext({basePath: PropTypes.string}), connect(mapStateToProps, mapDispatchToProps));
}