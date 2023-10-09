import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateState,
  selectState,
  updateStateAsync,
} from '../src/features/profileState/profileStateSlice';

import Profiles from './components/profiles.jsx';

const PrefPage = () => {

  //Grabbing the state and setting up dispatch
  const currentState = useSelector((state) => state.profileState.value);
  const dispatch = useDispatch();

  //handles click for the "Show me my potential matches" button
  const handleClick = async (e) => {

    //Prevents refresh
    e.preventDefault();

    //Grabs response from storage.txt in server/public folder
    const response = await fetch('http://localhost:8080/storage.txt');
    const result = await response.json();
    dispatch(updateStateAsync(result));
    //console.log to test currentState
    console.log([currentState]);
  };

  return (
    <div className='pref-container'>
      <div className='title'>Findr</div>
      <div className='quote'>
        <div>Whatchu want in your potential shawty? </div>
        Choose up to three interests:
      </div>
      <form
        className='submit-form'
        action='http://localhost:3000/search'
        method='GET'
      >
        <label for='preference1'>
          <input
            name='preference1'
            class='prefbox'
            placeholder='Your first interest...'
            id='pref-box-1'
          />
        </label>
        <label for='preference2'>
          <input
            name='preference2'
            class='prefbox'
            placeholder='Your second interest...'
            id='pref-box-2'
          />
        </label>
        <label for='preference3'>
          <input
            name='preference3'
            class='prefbox'
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
          <Profiles profile={currentState} index={index} />
        ))}
      </div>
    </div>
  );
};

export default PrefPage;
