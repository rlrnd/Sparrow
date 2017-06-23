// eslint-disable-next-line
import _ from 'lodash';
import { createSelector } from 'reselect';
import {combinePath} from '../utils';

let allKnownDefs = {};
let allKnownSelectors = {};

export function addExprDef(exprDef) {
    allKnownDefs[exprDef.id] = exprDef;
}

export function createExpressionSelector(basePath, exprId) {
    let exprDef = allKnownDefs[exprId];
    if(exprDef) {
        let exprId = exprDef.id;
        let result = allKnownSelectors[exprId];
        if(!result) {
            const deps = exprDef.deps.split(",");
            let paramSelectors = [];
            let paramNames = [];
            deps.forEach(function(dep,idx){
                dep = dep.trim();
                const depPath = combinePath(basePath, dep);
                // eslint-disable-next-line
                paramSelectors.push(new Function('state',"return _.get(state.file.file,'"+depPath+"');"));
                paramNames.push('p'+idx.toString());
            });
            paramNames.push("return (" + exprDef.stmt + ");");
            // eslint-disable-next-line
            paramSelectors.push(new Function(...paramNames));
            result = createSelector(...paramSelectors);
            allKnownSelectors[basePath + exprId] = result;
        }
        return result;
    }
    return null;
}

export function getExpressionSelector(basePath, exprId) {
    let result = allKnownSelectors[basePath + exprId];    
    if(!result) {
        result = createExpressionSelector(basePath, exprId);
    }
    return result;
}

