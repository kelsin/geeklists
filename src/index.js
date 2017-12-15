import React from 'react';
import '../node_modules/normalize.css/normalize.css';
import './index.scss';
import './lib/fontawesome-all';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import { BrowserRouter } from 'react-router-dom'

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
