import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import {
  updateState,
  selectState,
  updateStateAsync,
} from '../features/profileState/profileStateSlice';

import Profiles from './profiles.jsx';

const PrefPage = () => {

const [interests, setInterests] = useState([]);
const [matches, setMatches] = useState(null);
const [interestInput, setInterestInput] = useState('');
const [selectedInterests, setSelectedInterests] = useState([]);
const [filteredInterests, setFilteredInterests] = useState([]);

useEffect(() => {
    async function getInterests() {
      try {
      const response = await fetch('/interests');
      if (response.status === 200) {
        const data = response.json();
        setInterests(data);
      }
      } catch (err) {
        console.log('error in fetching interests')
      }
  };
  getInterests();
  }, []);

  const handleInterestInputChange = (e) => {
    const value = e.target.value;
    setInterestInput(value);
    filterInterestOptions(value);
  };
  
  const filterInterestOptions = (value) => {
    const filtered = interests.filter(interest => {interest.interest.toLowerCase().include(value.toLowerCase())}).slice(0, 10);
    setFilteredInterests(filtered);
  };
  //Grabbing the state and setting up dispatch
  const currentState = useSelector((state) => state.profileState.value);
  const dispatch = useDispatch();

  
  // saves user preferences into database
  const submitPreference = async (e) => {

    //Prevents refresh
    e.preventDefault();

    // interests from drop down here***
    

    
    // formating information to pass into the body
    const userInterest = {}

    // updates the user's preferences
    try {
      const response = await fetch('/database/update', {
      method: 'POST',
      body: JSON.stringify(userInterest),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    } catch (err) {
    console.error('Error during login:', err);

    };
  };
  
  return (
    <div className='pref-container'>
      <div className='title'>Findr</div>
      <div className='quote'>
        <div>Whatchu want in your potential shawty?</div>
        Choose up to three interests:
      </div>
      <br />
      <form autoComplete='off' className='submit-form'>
        <input className='input' id='interest input' type='text' placeholder='First Interest' value={interestInput} onChange={handleInterestInputChange} />
          {filteredInterests.length > 0 && (
            <div className='autocomplete-items'>
              {filteredInterests.map((option, index) => (
                <div key={index} onClick={() => {
                  setInterestInput(`${option.interest}`);
                  let interestList = selectedInterests;
                  interestList.push({id: option._id, interest: option.interest});
                  setSelectedInterests(interestList);
                  setFilteredInterests([]);
                }}>
                  {`${option.interest}`}
                  </div>
              ))}
            </div>
          )}
      </form>
      <button className='secondary' type='button' onClick={submitPreference}>
        Show me my potential matches
      </button>
       <div className='profile-main-container'>
        {currentState.map((profile, index) => (
          <Profiles key={index} profile={currentState} index={index} />
        ))}
      </div> 
    </div>
  );
};

export default PrefPage;
