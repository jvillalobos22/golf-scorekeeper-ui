import orm from '../models/index';
import {
  CREATE_MATCH_SUCCESS,
  MATCHES_ADD,
  CREATE_MATCH_ERROR
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
  console.log(action);
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
    // case ADD_HOLE_TO_MATCH:
    //   break;
    // case UPDATE_HOLE:
    //   break;
    // case UPDATE_MATCH:
    //   break;
    default:
      break;
  }

  return sess.state;
};

export default ormReducer;
