import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import {Provider} from 'react-redux'
import {configureAppStore} from './Redux/store'
import Snackbar from './Components/SnackBar/SnackBar';

const store = configureAppStore()


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Snackbar />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

