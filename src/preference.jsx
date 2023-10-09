import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateState,
  selectState,
  updateStateAsync,
} from '../src/features/profileState/profileStateSlice';
import store from './app/store.js';
import { current } from '@reduxjs/toolkit';

const PrefPage = () => {
  const currentState = useSelector(selectState);
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/storage.txt');
    const result = await response.text();
    dispatch(updateStateAsync(result));
    console.log(currentState);
  };

  return (
    <div className='pref-container'>
      <div className='title'>Findr</div>
      <div className='quote'> Whatchu want in your potential shawty?</div>
      <form
        className='submit-form'
        action='http://localhost:3000/search'
        method='GET'
      >
        <label for='preference1'>
          Preference 1:
          <input name='preference1' class='prefbox' id='pref-box-1' />
        </label>
        <label for='preference2'>
          Preference 2:
          <input name='preference2' class='prefbox' id='pref-box-2' />
        </label>
        <label for='preference3'>
          Preference 3:
          <input name='preference3' class='prefbox' id='pref-box-3' />
        </label>
        <button className='primary' type='submit'>
          Match Me!
        </button>
      </form>
      <button className='secondary' onClick={handleClick}>
        Show me the hoes
      </button>
      <div>
        {currentState.map((el) => (
          <div>
            {el.username}
            {el.interest}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrefPage;
