import { Model, many, fk, attr, ORM } from 'redux-orm';
import {
  MATCHES_ADD,
  GET_MATCHES,
  SELECT_MATCH,
  CREATE_MATCH,
  ADD_COURSE_TO_MATCH,
  ADD_HOLE_TO_MATCH,
  UPDATE_HOLE,
  UPDATE_MATCH
} from '../actions/actionTypes';

class Match extends Model {
  static get fields() {
    return {
      _id: attr(),
      // course: many('Course', 'matches'),
      course: attr(),
      date: attr(),
      holes: many('Hole', 'matches')
    };
  }

  static get modelName() {
    return 'Match';
  }

  // static reducer(action, Match, session) {
  //   const { payload, type } = action;

  //   switch (type) {
  //     case CREATE_MATCH:
  //       const props = Object.assign({}, payload);
  //       Match.create(props);
  //       break;
  //     case MATCHES_ADD:
  //       console.log('Inside MATCHES_ADD');
  //       payload.map(match => {
  //         Match.create(match);
  //       });
  //       break;
  //     // case ADD_COURSE_TO_MATCH:
  //     //   break;
  //     // case ADD_HOLE_TO_MATCH:
  //     //   break;
  //     // case UPDATE_HOLE:
  //     //   break;
  //     // case UPDATE_MATCH:
  //     //   break;
  //   }

  //   return undefined;
  // }
}

class Hole extends Model {
  static get fields() {
    return {
      _id: attr(),
      holeNumber: attr(),
      par: attr(),
      score: attr(),
      match: fk('Match', 'match')
    };
  }

  static get modelName() {
    return 'Hole';
  }

  static reducer(state, action, Hole, session) {
    const { payload, type } = action;
    switch (type) {
      case ADD_HOLE_TO_MATCH:
        Hole.create(payload);
        break;
      case UPDATE_HOLE:
        break;
    }
  }
}

class Course extends Model {
  static get fields() {
    return {
      holes: attr(),
      name: attr(),
      location: attr(),
      par: attr()
    };
  }

  static get modelName() {
    return 'Course';
  }
}

export const orm = new ORM();
orm.register(Match, Hole, Course);

export default orm;
export { Match, Hole, Course };
