import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { HashRouter } from 'react-router-dom';
import reducer from './reducers';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

let store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>, 
  document.getElementById('root'));
registerServiceWorker();
