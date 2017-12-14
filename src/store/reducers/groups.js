import { SET_GROUPS, SET_GROUP,
         SET_GROUP_GAME, SET_GROUP_GEEKLIST, SET_GROUP_USER } from '../actions';
import merge from 'ramda/src/merge';
import pathOr from 'ramda/src/pathOr';

const groupsReducer = (state = {}, action) => {
  switch(action.type) {
  case SET_GROUPS:
    return merge(state, action.data);
  case SET_GROUP: {
    let slug = action.data.slug;

    return {
      ...state,
      [slug]: merge(state[slug], action.data)
    }; }
  case SET_GROUP_GEEKLIST: {
    let slug = action.data.group_slug;
    let id = action.data.id;

    return {
      ...state,
      [slug]: merge(state[slug], {
        geeklists: {
          ...state[slug].geeklists,
          [id]: merge(state[slug].geeklists[id], action.data)
        }
      })
    };
  }
  case SET_GROUP_GAME: {
    let slug = action.data.group_slug;
    let id = action.data.objectid;
    console.log({state, action, slug, id});

    return {
      ...state,
      [slug]: merge(state[slug], {
        games: {
          ...state[slug].games,
          [id]: merge(pathOr({}, [slug, 'games', id], state), action.data)
        }
      })
    };
  }
  case SET_GROUP_USER: {
    let slug = action.data.group_slug;
    let username = action.data.username;

    return {
      ...state,
      [slug]: merge(state[slug], {
        users: {
          ...state[slug].users,
          [username]: merge(pathOr({}, [slug, 'users', username], state), action.data)
        }
      })
    };
  }
  default:
    return state;
  }
};

export default groupsReducer;
