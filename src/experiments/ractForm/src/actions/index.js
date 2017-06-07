import * as types from '../constants/ActionTypes'

export const updateFile = (data, path, value) => ({ type: types.UPDATE_FILE, data, path, value });
export const updateForm = () => ({type: types.UPDATE_FORM});
export const elementSelected = (elmDef) => ({type: types.ELM_SELECTED, elmDef});