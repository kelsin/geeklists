import compose from 'ramda/src/compose';
import invoker from 'ramda/src/invoker';
import prop from 'ramda/src/prop';
import { loading, doneLoading,
         setGroups, setGroup,
         setGroupGame, setGroupGeeklist, setGroupUser } from './index';

const API = 'https://geeklist-api.kelsin.net/';

const loadGroups = () => {
  return function(dispatch) {
    dispatch(loading());

    return fetch(API)
      .then(invoker(0, 'json'))
      .then(compose(dispatch, setGroups, prop('groups')))
      .then(compose(dispatch, doneLoading));
  }
}

const loadGroup = (slug) => {
  return function(dispatch) {
    dispatch(loading());

    return fetch(API + "group/" + slug)
      .then(invoker(0, 'json'))
      .then(compose(dispatch, setGroup))
      .then(compose(dispatch, doneLoading));
  }
}

const loadGroupGame = (slug, id) => {
  return function(dispatch) {
    dispatch(loading());

    return fetch(API + "group/" + slug + "/game/" + id)
      .then(invoker(0, 'json'))
      .then(compose(dispatch, setGroupGame))
      .then(compose(dispatch, doneLoading));
  }
}

const loadGroupGeeklist = (slug, id) => {
  return function(dispatch) {
    dispatch(loading());

    return fetch(API + "group/" + slug + "/geeklist/" + id)
      .then(invoker(0, 'json'))
      .then(compose(dispatch, setGroupGeeklist))
      .then(compose(dispatch, doneLoading));
  }
}

const loadGroupUser = (slug, username) => {
  return function(dispatch) {
    dispatch(loading());

    return fetch(API + "group/" + slug + "/user/" + username)
      .then(invoker(0, 'json'))
      .then(compose(dispatch, setGroupUser))
      .then(compose(dispatch, doneLoading));
  }
}
export {
  loadGroups,
  loadGroup,
  loadGroupGame,
  loadGroupGeeklist,
  loadGroupUser
};
