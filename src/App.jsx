import React from 'react';
import Login from '/components/Login.jsx'
import "./styles.scss";
import ReactDOM from "react-dom";
import { loginStore } from './app/store';
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider loginStore={loginStore}>
    <Login />
  </Provider>,
);



