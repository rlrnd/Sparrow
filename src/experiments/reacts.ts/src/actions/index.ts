import {ActionCreator, Action, ActionCreatorsMapObject} from 'redux';
import * as types from '../constants/ActionTypes'

export const updateFile: ActionCreator<Action> = (path: string, value: any) => ({ type: types.UPDATE_FILE, path, value });
export const updateForm: ActionCreator<Action> = () => ({type: types.UPDATE_FORM});
export const elementSelected: ActionCreator<Action> = (elmDef: any) => ({type: types.ELM_SELECTED, elmDef});

const FileActionCreatorsMap: ActionCreatorsMapObject = {
    'updateFile': updateFile,
    'updateForm': updateForm,
    'elementSelected': elementSelected
};

export default FileActionCreatorsMap;