import _ from 'lodash';
import { createSelector } from 'reselect';

let allKnownSelectors = {};

export function createExpressionSelector(exprDef) {
    if(exprDef) {
        let exprId = exprDef.id;
        let result = allKnownSelectors[exprId];
        if(!result) {
            const deps = exprDef.deps.split(",");
            let paramSelectors = [];
            let paramNames = [];
            let n = 0;
            deps.forEach(function(dep){
                // eslint-disable-next-line
                paramSelectors.push(new Function('state',"return _.get(state.file.file,'"+dep+"');"));
                paramNames.push('p'+n.toString());
            });
            //paramNames.push("return " + exprDef.stmt + ";");
            paramNames.push("return (" + exprDef.stmt + ");");
            // eslint-disable-next-line
            paramSelectors.push(new Function(...paramNames));
            result = createSelector(...paramSelectors);
            _.set(allKnownSelectors, exprId, result);
        }
        return result;
    }
    return null;
}

export function getExpressionSelector(exprId) {
    return allKnownSelectors[exprId];    
}

