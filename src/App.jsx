import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './app/store';
import { loginStore } from './app/loginStore.js';

import PrefPage from './preference.jsx';
import Login from './components/Login.jsx';

import styles from './styles.scss'; 


export default function App() {
 return (
  <div className="App">
    <main>
      <Routes>

        <Route path='/' element={
          <Provider store={store}>
        <PrefPage />
        </Provider>
        }/>

          <Route path='/login' element={
            <Provider store={loginStore}>
          <Login />
          </Provider>
          }/>

      </Routes>
    </main>
    </div>
 )
}