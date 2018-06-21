import orm from '../models/index';
import { CREATE_MATCH } from '../actions/actionTypes';
import { MATCHES_ADD } from '../actions/actionTypes';

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

const ormReducer = (dbState, action) => {
  const sess = orm.session(dbState);

  const { Match, Hole } = sess;

  switch (action.type) {
    case CREATE_MATCH:
      Match.create(action.match);
      break;
    case MATCHES_ADD:
      applyMatchesAdd(action, Hole, Match);
      break;
    // case ADD_COURSE_TO_MATCH:
    //   break;
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
