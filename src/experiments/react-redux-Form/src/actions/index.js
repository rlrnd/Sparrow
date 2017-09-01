import * as types from '../constants/ActionTypes'

export const updateFile = (path, value) => ({ type: types.UPDATE_FILE, path, value });
export const updateForm = () => ({type: types.UPDATE_FORM});
export const elementSelected = (elmDef) => ({type: types.ELM_SELECTED, elmDef});