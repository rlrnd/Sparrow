import { combineReducers } from 'redux';
import file from './file';
import form from './form';

const rootReducer = combineReducers({
  file, form
});

export default rootReducer;