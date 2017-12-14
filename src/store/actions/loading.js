import compose from 'ramda/src/compose';
import invoker from 'ramda/src/invoker';
import identity from 'ramda/src/identity';
import prop from 'ramda/src/prop';
import moment from 'moment';
import { loading, doneLoading,
         SET_GROUPS, SET_GROUP,
         SET_GROUP_GAME, SET_GROUP_GEEKLIST, SET_GROUP_USER,
         setGroups, setGroup,
         setGroupGame, setGroupGeeklist, setGroupUser } from './index';

const API = 'https://geeklist-api.kelsin.net/';

// Time between components updating themselves
const updateTime = 60;

const needsUpdate = lastUpdate => lastUpdate.isBefore(moment().subtract(updateTime, 'seconds'));
const typeNeedsUpdate = (type, state) => {
  let lastUpdate = state.updates[type];

  return lastUpdate ? needsUpdate(lastUpdate) : true;
}

const createLoader = (type, cache, url, transform = identity) => (dispatch, getState) => {
  let state = getState();
  if(typeNeedsUpdate(type + '-' + cache, state)) {
    dispatch(loading());

    return fetch(url)
      .then(invoker(0, 'json'))
      .then(transform)
      .then(data => ({
        type,
        cache,
        data
      }))
      .then(dispatch)
      .catch(console.log.bind.console)
      .then(compose(dispatch, doneLoading));
  } else {
    return Promise.resolve();
  }
}

const loadGroups = () => createLoader(SET_GROUPS, '', API, prop('groups'));
const loadGroup = slug => createLoader(SET_GROUP, slug, API + "group/" + slug);
const loadGroupGame = (slug, id) => createLoader(SET_GROUP_GAME, `${slug}-${id}`,
                                                API + "group/" + slug + "/game/" + id);
const loadGroupGeeklist = (slug, id) => createLoader(SET_GROUP_GEEKLIST, `${slug}-${id}`,
                                                    API + "group/" + slug + "/geeklist/" + id);
const loadGroupUser = (slug, username) => createLoader(SET_GROUP_USER, `${slug}-${username}`,
                                                      API + "group/" + slug + "/user/" + username);

export {
  loadGroups,
  loadGroup,
  loadGroupGame,
  loadGroupGeeklist,
  loadGroupUser
};
