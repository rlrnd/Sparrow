import * as types from '../constants/ActionTypes'

export const updateFile = (data, path, value) => ({ type: types.UPDATE_FILE, data, path, value })