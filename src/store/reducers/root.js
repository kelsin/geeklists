import { combineReducers } from 'redux';
import loading from './loading';
import groups from './groups';

const rootReducer = combineReducers({
  loading,
  groups
});

export default rootReducer;
