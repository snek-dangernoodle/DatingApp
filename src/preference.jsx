import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateState,
  selectState,
  updateStateAsync,
} from '../src/features/profileState/profileStateSlice';
import { current } from '@reduxjs/toolkit';
import Profiles from './components/profiles.jsx';

const PrefPage = () => {
  const currentState = useSelector((state) => state.profileState.value);
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/storage.txt');
    const result = await response.json();
    dispatch(updateStateAsync(result));
    // const newState = store.getState().profileState.value;
    // updatedState = newState;
    // console.log(updatedState);
    console.log([currentState]);
  };

  return (
    <div className='pref-container'>
      <div className='title'>Findr</div>
      <div className='quote'> Whatchu want in your potential girlfriend?</div>
      <form
        className='submit-form'
        action='http://localhost:3000/search'
        method='GET'
      >
        <label for='preference1'>
          Preference 1:
          <input name='preference1' className='prefbox' id='pref-box-1' />
        </label>
        <label for='preference2'>
          Preference 2:
          <input name='preference2' className='prefbox' id='pref-box-2' />
        </label>
        <label for='preference3'>
          Preference 3:
          <input name='preference3' className='prefbox' id='pref-box-3' />
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
