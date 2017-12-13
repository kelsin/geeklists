const LOADING = 'LOADING';
const DONE_LOADING = 'DONE_LOADING';

const SET_GROUP = 'SET_GROUP';
const SET_GROUPS = 'SET_GROUPS';
const SET_GROUP_GAME = 'SET_GROUP_GAME';
const SET_GROUP_GEEKLIST = 'SET_GROUP_GEEKLIST';
const SET_GROUP_USER = 'SET_GROUP_USER';

const loading = () => ({ type: LOADING });
const doneLoading = () => ({ type: DONE_LOADING });

const setGroup = data => ({ type: SET_GROUP, data });
const setGroups = data => ({ type: SET_GROUPS, data });
const setGroupGame = data => ({ type: SET_GROUP_GAME, data });
const setGroupGeeklist = data => ({ type: SET_GROUP_GEEKLIST, data });
const setGroupUser = data => ({ type: SET_GROUP_USER, data });

export {
  LOADING,
  DONE_LOADING,
  SET_GROUP,
  SET_GROUPS,
  SET_GROUP_GAME,
  SET_GROUP_GEEKLIST,
  SET_GROUP_USER,

  loading,
  doneLoading,
  setGroup,
  setGroups,
  setGroupGame,
  setGroupGeeklist,
  setGroupUser
};
