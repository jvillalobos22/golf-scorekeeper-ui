import orm from '../models/index';
import {
  CREATE_MATCH_SUCCESS,
  DO_COMPLETE_MATCH_SUCCESS,
  MATCHES_ADD,
  PATCH_SCORE_UPDATE_SUCCESS,
  LOGOUT_SUCCESS
} from '../actions/actionTypes';

const applyMatchesAdd = (action, Hole, Match) => {
  action.matches.map(match => {
    const holeIds = match.holes.map(hole => {
      let createHole = Object.assign({}, hole);
      createHole.id = createHole._id;
      delete createHole._id;
      let newHole = Hole.create(createHole);
      return newHole.id;
    });
    const newMatch = Object.assign({}, match, {
      id: match._id,
      holes: holeIds
    });
    return Match.create(newMatch);
  });
};

const applyMatchCreate = (action, Hole, Match) => {
  const holeIds = action.match.holes.map(hole => {
    let createHole = Object.assign({}, hole);
    createHole.id = createHole._id;
    delete createHole._id;
    let newHole = Hole.create(createHole);
    return newHole.id;
  });
  const newMatch = Object.assign({}, action.match, {
    id: action.match._id,
    holes: holeIds
  });
  return Match.create(newMatch);
};

const applyScoreUpdate = (action, Hole, Match) => {
  const { holes } = action.match;
  return holes.map(hole => {
    let updateHole = { ...hole };
    updateHole.id = updateHole._id;
    delete updateHole._id;
    let newHole = Hole.withId(hole._id).update(updateHole);
    return newHole;
  });
};

const applyCompleteMatch = (action, Match) => {
  return Match.withId(action.id).update({
    isComplete: true
  });
};

const ormReducer = (dbState, action) => {
  const sess = orm.session(dbState);

  const { Match, Hole } = sess;

  switch (action.type) {
    case MATCHES_ADD:
      applyMatchesAdd(action, Hole, Match);
      break;
    case CREATE_MATCH_SUCCESS:
      applyMatchCreate(action, Hole, Match);
      break;
    case PATCH_SCORE_UPDATE_SUCCESS:
      applyScoreUpdate(action, Hole, Match);
      break;
    case DO_COMPLETE_MATCH_SUCCESS:
      applyCompleteMatch(action, Match);
      break;
    case LOGOUT_SUCCESS: {
      return orm.getEmptyState();
    }
    default:
      break;
  }

  return sess.state;
};

export default ormReducer;
