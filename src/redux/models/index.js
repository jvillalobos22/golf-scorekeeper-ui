import { Model, many, fk, attr, ORM } from 'redux-orm';
import { ADD_HOLE_TO_MATCH, UPDATE_HOLE } from '../actions/actionTypes';

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
      default:
        return state;
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
