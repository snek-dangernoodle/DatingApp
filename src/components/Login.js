import React, { useState } from 'react'



const Login = () => {

  const [username, setUsername] = useState('');
  const [displayedUsername, setDisplayedUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleInputChange = (event) => {
    setUsername(event.target.value);
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleButtonClick = () => {
    setUsername(username);
  }
  return (
    <div>
      <h1>Log in to your profile </h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={handlePasswordChange}
      />
      <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={handleInputChange}
    />
    <button id="login" onClick={setUsername}>Log in</button>
    </div>
      
 
  );
    
  };
  export default Login;
  

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
