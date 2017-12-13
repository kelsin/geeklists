import { max } from 'ramda';
import { LOADING, DONE_LOADING } from '../actions';

const loadingReducer = (state = 0, action) => {
  switch(action.type) {
  case LOADING:
    return state + 1;
  case DONE_LOADING:
    return max(0, state - 1);
  default:
    return state;
  }
};

export default loadingReducer;
