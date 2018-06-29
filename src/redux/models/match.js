import { Model, many, fk, attr, ORM } from 'redux-orm';
import {
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
      title: attr(),
      numberHoles: attr(),
      par: attr(),
      isComplete,
      course: many('Course', 'matches'),
      date: attr(),
      holes: fk('Hole', 'matches')
    };
  }

  static get modelName() {
    return 'Match';
  }

  static reducer(state, action, Match, session) {
    const { payload, type } = action;

    switch (type) {
      case CREATE_MATCH:
        const props = Object.assign({}, payload);
        Match.create(props);
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

    return Match.getNextState();
  }
}

class Hole extends Model {
  static get fields() {
    return {
      _id: attr(),
      holeNumber: attr(),
      par: attr(),
      score: attr()
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
