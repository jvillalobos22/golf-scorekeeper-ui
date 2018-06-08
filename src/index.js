import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

import { matches } from './helpers/dummyData';

ReactDOM.render(
  <App matches={matches} />, 
  document.getElementById('root')
);
registerServiceWorker();