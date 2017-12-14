import moment from 'moment';

const SET_RE = /^SET_/;

const updatesReducer = (state = {}, action) => {
  if(SET_RE.test(action.type)) {
    return {
      ...state,
      [action.type + '-' + action.cache]: moment()
    }
  } else {
    return state;
  }
};

export default updatesReducer;
