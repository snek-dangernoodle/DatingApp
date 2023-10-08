import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './preference.jsx';
import matchPage from './components/Matches.jsx';
import Login from './components/Login.jsx';
import { store } from './app/store';

const App = () => {
  return (
    <div>
      <h1>Findr</h1>
      <Login />
    </div>
  );
};

export default App;
