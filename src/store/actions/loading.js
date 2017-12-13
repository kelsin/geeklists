import compose from 'ramda/src/compose';
import invoker from 'ramda/src/invoker';
import prop from 'ramda/src/prop';
import { loading, doneLoading, setGroups } from './index';

const API = 'https://geeklist-api.kelsin.net/';

const loadGroups = () => {
  return function(dispatch) {
    dispatch(loading());

    return fetch(API)
      .then(invoker(0, 'json'))
      .then(compose(dispatch, setGroups, prop('groups')))
      .then(() => dispatch(doneLoading()));
      //.finally(() => dispatch(doneLoading()));
  }
}

export {
  loadGroups
};
