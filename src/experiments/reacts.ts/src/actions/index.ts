import {ActionCreator, Action} from 'redux';
import * as types from '../constants/ActionTypes';

export class ActionUpdateFile implements Action {
  type: string;
  path: string;
  value: object;
}

export const updateFile: ActionCreator<ActionUpdateFile> 
  = (path: string, value: any) => ({ type: types.UPDATE_FILE, path, value });

export const updateForm: ActionCreator<Action> 
  = () => ({type: types.UPDATE_FORM});


export class ActionElementSelected implements Action {
  type: string;
  elmDef?: object;
}

export const elementSelected: ActionCreator<ActionElementSelected> 
  = (elmDef: any) => ({type: types.ELM_SELECTED, elmDef});
