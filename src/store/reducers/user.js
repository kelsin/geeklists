import { SET_GROUP_USER } from '../actions';

const userReducer = (state = {}, action) => {
  switch(action.type) {
  case SET_GROUP_USER:
    return {
      ...state,
      [action.data.username]: action.data
    };
  default:
    return state;
  }
}

export default userReducer;
