import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import fontawesome from '@fortawesome/fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faPencilAlt,
  faCaretLeft,
  faCaretRight,
  faCaretDown,
  faCaretUp,
  faCheck,
  faExclamation,
  faGolfBall,
  faWindowClose
} from '@fortawesome/fontawesome-free-solid';

import store from './redux/store';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

fontawesome.library.add(
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faPencilAlt,
  faCaretLeft,
  faCaretRight,
  faCaretDown,
  faCaretUp,
  faCheck,
  faExclamation,
  faGolfBall,
  faWindowClose
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
