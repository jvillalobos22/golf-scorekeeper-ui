import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { orm } from '../models';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const saga = createSagaMiddleware();
const logger = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  // {
  //   orm: orm.getEmptyState(),
  //   selecteMatchId: 0
  // },
  composeEnhancers(applyMiddleware(saga, logger))
);

saga.run(rootSaga);

export default store;
