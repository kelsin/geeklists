import { combineReducers } from 'redux';
import loading from './loading';
import groups from './groups';
import group from './group';
import user from './user';

const rootReducer = combineReducers({
  loading,
  groups,
  group,
  user
});

export default rootReducer;
