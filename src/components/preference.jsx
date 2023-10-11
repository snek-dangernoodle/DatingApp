import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import {
  updateState,
  selectState,
  updateStateAsync,
} from '../features/profileState/profileStateSlice';

import Profiles from './profiles.jsx';

const PrefPage = () => {

  //Grabbing the state and setting up dispatch
  const currentState = useSelector((state) => state.profileState.value);
  const dispatch = useDispatch();

  //handles click for the "Show me my potential matches" button
  const handleClick = async (e) => {

    //Prevents refresh
    e.preventDefault();

    //Grabs response from storage.txt in server/public folder
    const response = await fetch('/storage.txt');
    const result = await response.json();
    dispatch(updateStateAsync(result));
    //console.log to test currentState
  };

  return (
    <div className='pref-container'>
      <div className='title'>Findr</div>
      <div className='quote'>
        <div>Whatchu want in your potential shawty?</div>
        Choose up to three interests:
      </div>
      <form
        className='submit-form'
        action='/search'
        method='GET'
      >
        <label htmlFor='preference1'>
          <input
            name='preference1'
            className='prefbox'
            placeholder='Your first interest...'
            id='pref-box-1'
          />
        </label>
        <label htmlFor='preference2'>
          <input
            name='preference2'
            className='prefbox'
            placeholder='Your second interest...'
            id='pref-box-2'
          />
        </label>
        <label htmlFor='preference3'>
          <input
            name='preference3'
            className='prefbox'
            placeholder='Your third interest...'
            id='pref-box-3'
          />
        </label>
        <button className='primary' type='submit'>
          Match Me!
        </button>
      </form>
      <button className='secondary' onClick={handleClick}>
        Show me my potential matches
      </button>
      <div className='profile-main-container'>
        {currentState.map((profile, index) => (
          <Profiles key={index} profile={currentState} index={index} />
        ))}
      </div>
      <Link to='/'>login page</Link>
    </div>
  );
};

export default PrefPage;
