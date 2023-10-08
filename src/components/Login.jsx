import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthenticated } from './loginStateSlice';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

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
        history.push('/preference.jsx');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div classname='Login-container'>
      <div>
        <h1>Log in to your profile </h1>
        <form className='submit-form' onSubmit={handleFormSubmit}>
          <input type='text' name='username' placeholder='Username' />
          <input type='password' name='password' placeholder='Password' />
          <button id='login' className='primary' type='submit'>
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;

// const [username, setUsername] = useState('');
// const [displayedUsername, setDisplayedUsername] = useState('');
// const [password, setPassword] = useState('');

// const handleInputChange = (event) => {
//   setUsername(event.target.value);
// }
// const handlePasswordChange = (event) => {
//   setPassword(event.target.value);
// }

// const handleButtonClick = () => {
//   setUsername(username);
// }

// // Redux actions (actions.js)
// export const setUsername = (username) => ({
//   type: 'SET_USERNAME',
//   payload: username,
// });

// export const setPassword = (password) => ({
//   type: 'SET_PASSWORD',
//   payload: password,
// });

// // Redux reducers (reducers.js)
// const initialState = {
//   username: '',
//   password: '',
// };

// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'SET_USERNAME':
//       return { ...state, username: action.payload };
//     case 'SET_PASSWORD':
//       return { ...state, password: action.payload };
//     default:
//       return state;
//   }
// };

// export default rootReducer;

// // React Component (Login.js)
// import React from 'react';
// import { connect } from 'react-redux';
// import { setUsername, setPassword } from './actions';

// const Login = ({ username, password, setUsername, setPassword }) => {
//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleLogin = () => {
//     // Dispatch actions to store username and password data
//     console.log('Username:', username);
//     console.log('Password:', password);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={handleUsernameChange}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={handlePasswordChange}
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   username: state.username,
//   password: state.password,
// });

// const mapDispatchToProps = {
//   setUsername,
//   setPassword,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Login);

// // Redux Store (store.js)
// import { createStore } from 'redux';
// import rootReducer from './reducers';

// const store = createStore(rootReducer);

// export default store;
