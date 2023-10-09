import React from 'react';
import { useDispatch } from 'react-redux';

import { setUsername, setPassword, setAuthenticated } from '../features/profileState/loginSlice';

//Does not function, should render fields for username and password
//needs to have route sent to /preferences.jsx if authenticared = true;



const Login = () => {
  const dispatch = useDispatch();


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const loginEndpoint = 'http://localhost:3000/login';
    const username = e.target.username.value;
    const password = e.target.password.value;
    try {
        const response = await fetch(loginEndpoint, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        dispatch(setAuthenticated(false));
      } else if (response.ok) {
        dispatch(setAuthenticated(true));
    
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='Login-container'>
      <div>
        <h1>Log in to your profile </h1>
        <form className='submit-form' onSubmit={handleFormSubmit}> 
        <input type='text' name='username' placeholder='Username' />
        <input type='password' name='password' placeholder='Password' />
        <button id='login' className='primary' type='submit'>
             Log in to find your match
        </button>
        </form> 
    </div>
    </div>
  );
};
export default Login;

