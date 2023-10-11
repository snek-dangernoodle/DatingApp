import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { setUsername, setPassword, setAuthenticated } from '../features/profileState/loginSlice';

//Does not function, should render fields for username and password
//needs to have route sent to /preferences.jsx if authenticared = true;



const Login = () => {

  const [auth, setAuth] = useState('login');
  const [matchPassword, setMatchPassword] = useState(true);
  const navigate = useNavigate();

  console.log(auth)

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const loginEndpoint = `/database/${auth}`;
    console.log(loginEndpoint)
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    
    if (password === confirmPassword) {

      try {
          const response = await fetch(loginEndpoint, {
          method: 'POST',
          body: JSON.stringify({
            username: username,
            password: password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 201) {
          navigate('/home')
        }
        // if (response.status === 401) { 
        //   dispatch(setAuthenticated(false));
        // } else if (response.ok) {
        //   dispatch(setAuthenticated(true));
      
        // }
      } catch (error) {
        console.error('Error during login:', error);
      }
    } else {
      setMatchPassword(false)
    }
  };

  // signup page
  if (auth === 'signup') {
    return (
      <div className='Login-container'>
      <div>
        <h1>Sign up </h1>
        <form className='submit-form' onSubmit={handleFormSubmit}> 
          <input className='username' type='text' name='username' placeholder='Username' />
          <br />
          <input type='password' name='password' placeholder='Password' />
          <br />
          <input type='password' name='confirmPassword' placeholder='Confirm password'></input>
          <button id='login' className='primary' type='submit' >
             Sign Up
          </button>
          {!matchPassword && (
            <p id='passwordMatch'>Password and confirm password does not match</p>
          )}
        </form>
        <button id='login_page' className='primary' onClick={() => {setAuth('login')}}>Back to Login</button> 
      </div>
      <Link to='/home'>home page</Link>
    </div>
    )
  }

  // login page
  return (
    <div className='Login-container'>
      <div>
        <h1>Log in to your profile </h1>
        <form className='submit-form' onSubmit={handleFormSubmit}> 
          <input className='username' type='text' name='username' placeholder='Username' />
          <br />
          <input type='password' name='password' placeholder='Password' />
          <br />
          <button id='login' className='primary' type='submit' >
             Log in to find your match
          </button>
        </form>
        <button id='sign_up_page' className='primary' onClick={() => {setAuth('signup')}}>Sign Up</button> 
      </div>
      <Link to='/home'>home page</Link>
    </div>
  );
};
export default Login;

