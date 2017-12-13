import { SET_GROUPS } from '../actions';

const groupsReducer = (state = [], action) => {
  console.log(action);
  switch(action.type) {
  case SET_GROUPS:
    return action.data;
  default:
    return state;
  }
};

export default groupsReducer;
