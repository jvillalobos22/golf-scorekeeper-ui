import orm from '../models/index';
import {
  CREATE_MATCH_SUCCESS,
  MATCHES_ADD,
  CREATE_MATCH_ERROR,
  PATCH_SCORE_UPDATE_SUCCESS,
  PATCH_SCORE_UPDATE_ERROR
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
    const newMatch = Object.assign({}, match, { holes: holeIds });
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
  const newMatch = Object.assign({}, action.match, { holes: holeIds });
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
    default:
      break;
  }

  return sess.state;
};

export default ormReducer;
