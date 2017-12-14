import { combineReducers } from 'redux';
import loading from './loading';
import groups from './groups';
import updates from './updates';

const rootReducer = combineReducers({
  loading,
  groups,
  updates
});

export default rootReducer;
