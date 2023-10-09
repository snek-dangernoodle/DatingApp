import React from 'react';
import Login from './components/Login.jsx'
import "./styles.scss";
import ReactDOM from "react-dom";
import { loginStore } from './app/loginStore.js';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';




ReactDOM.render(
  <Provider store={loginStore}>
    <Login/>
  </Provider>,
 //this would be the root if login works
);






//store={loginStore}
