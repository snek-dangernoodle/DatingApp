import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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
  const [selectedInterests, setSelectedInterests] = useState({});
  const [filteredInterests, setFilteredInterests] = useState([]);

  useEffect(() => {
    async function getInterests() {
      try {
        const response = await fetch('/database/interests', {
          method: "GET",
        });
        if (response.status === 200) {
          const data = await response.json();
          setInterests(data);
        }
      } catch (err) {
        console.log('error in fetching interests');
      }
    }
    getInterests();
  }, []);


  const handleInterestInputChange = (e) => {
    const value = e.target.value;
    setInterestInput(value);
    filterInterestOptions(value);
  };

  const filterInterestOptions = (value) => {
    const filtered = interests
      .filter((interest) => interest.interest.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 10);
    setFilteredInterests(filtered);
  };


  // saves user preferences into database
  const submitPreference = async (e) => {
    //Prevents refresh
    e.preventDefault();

    // interests from drop down here***
    setInterests(['hi']);
    console.log(interests);

    // formating information to pass into the body
    // const userInterest = {};

    // // updates the user's preferences
    // try {
    //   const response = await fetch('/database/update', {
    //     method: 'POST',
    //     body: JSON.stringify(userInterest),
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    // } catch (err) {
    //   console.error('Error during login:', err);
    // }
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
        <input
          className='input'
          id='interest input'
          type='text'
          placeholder='First Interest'
          value={interestInput}
          onChange={handleInterestInputChange}
        />
        {filteredInterests.length > 0 && (
          <div className='autocomplete-items'>
            {filteredInterests.map((option, index) => (
              <div
                key={index}
                onClick={() => {
                  setInterestInput(`${option.interest}`);
                  // let interestList = (...selectedInterest, option._id: option.interest);
                  setSelectedInterests(interestList);
                  setFilteredInterests([]);
                }}
              >
                {`${option.interest}`}
              </div>
            ))}
          </div>
        )}
      </form>
      <button className='secondary' type='button' onClick={submitPreference}>
        Show me my potential matches
      </button>
    </div>
  );
};

export default PrefPage;
