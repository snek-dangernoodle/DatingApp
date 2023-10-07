import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import prefPage from './preference.jsx';
import matchPage from './components/Matches.jsx';
import Login from './components/Login.jsx';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route exact path='/pref' element={<prefPage />} />
          <Route path='/matches' element={<matchPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
