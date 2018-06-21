import orm from '../models/index';
import { CREATE_MATCH } from '../actions/actionTypes';
import { MATCHES_ADD } from '../actions/actionTypes';
import { MATCHES_FETCH } from '../actions/actionTypes';

const separateMatchFromHoles = (match, Hole) => {
  const holes = { match };
  const holesIds = holes.map(hole => {
    const newHole = Hole.create(hole);
    return newHole.id;
  });
  return;
};
const ormReducer = (dbState, action) => {
  const sess = orm.session(dbState);

  const { Match, Hole } = sess;

  switch (action.type) {
    case CREATE_MATCH:
      Match.create(action.match);
      break;
    case MATCHES_ADD:
      console.log('Inside MATCHES_ADD');
      console.log(action.matches);
      action.matches.map(match => {
        const holeIds = match.holes.map(hole => {
          let createHole = Object.assign({}, hole);
          createHole.id = createHole._id;
          delete createHole._id;
          let newHole = Hole.create(createHole);
          console.log(newHole.id);
          return newHole.id;
        });
        const newMatch = Object.assign({}, match, { holes: holeIds });
        Match.create(newMatch);
      });
      break;
    // case ADD_COURSE_TO_MATCH:
    //   break;
    // case ADD_HOLE_TO_MATCH:
    //   break;
    // case UPDATE_HOLE:
    //   break;
    // case UPDATE_MATCH:
    //   break;
  }

  return sess.state;
};

export default ormReducer;
