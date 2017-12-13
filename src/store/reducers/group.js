import { SET_GROUP } from '../actions';

const groupReducer = (state = {}, action) => {
  switch(action.type) {
  case SET_GROUP:
    return {
      ...state,
      [action.data.slug]: action.data
    };
  default:
    return state;
  }
}

export default groupReducer;
