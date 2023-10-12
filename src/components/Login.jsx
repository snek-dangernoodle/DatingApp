import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  setUsername,
  setPassword,
  setAuthenticated,
} from '../features/profileState/loginSlice';

//Does not function, should render fields for username and password
//needs to have route sent to /preferences.jsx if authenticared = true;

const Login = () => {
  const [auth, setAuth] = useState('login');
  const [matchPassword, setMatchPassword] = useState(true);
  const [entry, setEntry] = useState(true);

  // const [isLoggedin, setIsLoggedin] = useState(null)
  const navigate = useNavigate();

  // console.log(auth)

  useEffect(() => {
    async function verifySession() {
      const response = await fetch('/verifySession');
      if (response.status === 200) {
        navigate('/dashboard');
      }
    }
    verifySession();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const loginEndpoint = `/database/${auth}`;
    // console.log(loginEndpoint)
    const username = e.target.username.value;
    const password = e.target.password.value;
    let confirmPassword;
    if (auth === 'signup') {
      confirmPassword = e.target.confirmPassword.value;
    }

    if (password === confirmPassword || auth === 'login') {
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
          navigate('/dashboard');
        } else {
          setEntry(false);
        }
      } catch (err) {
        console.error('Error during login:', err);
      }
    } else {
      setMatchPassword(false);
    }
  };

  // signup page
  if (auth === 'signup') {
    return (
      <div className='Login-container'>
        <div>
          <h1>Sign up </h1>
          <form className='submit-form' onSubmit={handleFormSubmit}>
            <input
              className='username'
              type='text'
              name='username'
              placeholder='Username'
              autoComplete='off'
            />
            <br />
            <input type='password' name='password' placeholder='Password' />
            <br />
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirm password'
              autoComplete='off'
            ></input>
            <button id='login' className='primary' type='submit'>
              Sign Up
            </button>
            {!matchPassword && (
              <p className='passwordMatch'>
                Password and confirm password does not match
              </p>
            )}
          </form>
          <button
            className='primary'
            onClick={() => {
              setAuth('login');
            }}
          >
            Back to Login
          </button>
        </div>
        <Link to='/dashboard'>dashboard</Link>
      </div>
    );
  }

  // login page
  return (
    <div className='Login-container'>
      <div>
        <h1 id='mainLogo'>Findr</h1>
        <form className='submit-form' onSubmit={handleFormSubmit}>
          <input
            className='username'
            type='text'
            name='username'
            placeholder='Username'
            autoComplete='off'
          />
          <br />
          <input type='password' name='password' placeholder='Password' />
          <br />
          <button id='login' className='primary' type='submit'>
            Log in to find your match
          </button>
          {!entry && (
            <p className='passwordMatch'>Username or password is incorrect</p>
          )}
        </form>
        <button
          type='button'
          className='primary'
          onClick={() => {
            setAuth('signup');
          }}
        >
          Sign Up
        </button>
      </div>
      <Link to='/dashboard'>dashboard</Link>
    </div>
  );
};
export default Login;
