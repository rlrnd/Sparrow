import * as _ from 'lodash';
import {createSelector} from 'reselect';
import {combinePath} from '../utils';

let allKnownDefs = {};
let allKnownSelectors = {};

export function addExprDef(exprDef: any) {
    allKnownDefs[exprDef.id] = exprDef;
}

export function createExpressionSelector(basePath:string, exprId:string) {
    let exprDef = allKnownDefs[exprId];
    if(exprDef) {
        let exprId = exprDef.id;
        let result = allKnownSelectors[exprId];
        if(!result) {
            const deps = exprDef.deps.split(",");
            let paramSelectors: any[] = [];
            let paramNames: any[] = [];
            deps.forEach(function(dep:string,idx:number){
                dep = dep.trim();
                const depPath = combinePath(basePath, dep);
                // tslint-disable-next-line
                paramSelectors.push(new Function('state',"return _.get(state.file.file,'"+depPath+"');"));
                paramNames.push('p'+idx.toString());
            });
            paramNames.push("return (" + exprDef.stmt + ");");
            // tslint-disable-next-line
            paramSelectors.push(new Function(...paramNames));
            result = createSelector.call({}, ...paramSelectors);
            _.set(allKnownSelectors, basePath + exprId, result);
        }
        return result;
    }
    return null;
}

export function getExpressionSelector(basePath:string, exprId:string) {
    let result = allKnownSelectors[basePath + exprId];    
    if(!result) {
        result = createExpressionSelector(basePath, exprId);
    }
    return result;
}

