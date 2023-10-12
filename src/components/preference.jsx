import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  updateState,
  selectState,
  updateStateAsync,
} from '../features/profileState/profileStateSlice';

import Profiles from './profiles.jsx';
import Interest from './Interest.jsx';
import Logout from './Logout.jsx';
import { TRUE } from 'sass';

const PrefPage = () => {
  // sets up the form
  const [interests, setInterests] = useState([]);
  const [interestInputs, setInterestInputs] = useState(['', '', '']);
  const [filteredInterests, setFilteredInterests] = useState([[], [], []]);
  const [interestList, setInterestList] = useState([]);
  const [matches, setMatches] = useState([]);
  const [matchesClicked, setMatchesClicked] = useState(false);

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


  const handleInterestInputChange = (e, index) => {
    const value = e.target.value;
    const newInterestInputs = [...interestInputs];
    newInterestInputs[index] = value;
    setInterestInputs(newInterestInputs);
    filterInterestOptions(value, index);
  };

  const filterInterestOptions = (value, index) => {
    const filtered = interests
      .filter((interest) => interest.interest.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 10);

    setFilteredInterests((prevFilteredInterests) => {
      const newFilteredInterests = [...prevFilteredInterests];
      newFilteredInterests[index] = filtered;
      return newFilteredInterests;
    });
  };

  const handleInterestClick = (option, index) => {
    setInterestInputs((prevInputs) => {
      const newInputs = [...prevInputs];
      newInputs[index] = option.interest;
      return newInputs;
    });
    setInterestList([...interestList, option])
    // let interestList = (...selectedInterest, option._id: option.interest);
    // setSelectedInterests(interestList);
    setFilteredInterests([[], [], []]);

  };

  // function to create the data to send to the interest to the backend
  const matchInterestDB = (interestDB) => {
    const newInterestInputs = [...interestInputs]
    const interests = []
    while (newInterestInputs.length > 0) {
      for (let i=0;i<interestDB.length;i++) {
        const interest = interestDB[i].interest
        const id = interestDB[i].interest_id
        if (newInterestInputs.includes(interest)) {
          const index = newInterestInputs.indexOf(interest)
          interests.push(id);
          newInterestInputs.splice(index, 1)
        };
      };
    };
    return interests;
  }

  // saves user preferences into database
  const submitPreference = async (e) => {
    //Prevents refresh
    e.preventDefault();
    // // updates the user's preferences
    const userInterests = matchInterestDB(interests)
    try {
      const response = await fetch('/database/update', {
        method: 'POST',
        body: JSON.stringify({interestArr: userInterests}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      let interestObj = {}; // {1: 'interset 1', 2: 'interest 2',};
      interests.forEach((element) => {
        interestObj[element.interest_id] = element.interest;
      })

      data.forEach((object) => {
          object.interest1 = interestObj[object.interest1]
          object.interest2 = interestObj[object.interest2]
          object.interest3 = interestObj[object.interest3]
      });
      
      // console.log('interest obj: ', interestObj)
      setMatches(data);
      setMatchesClicked(true);
      // console.log(matches)
      // [{username: , interest1: 2, interest2, itnerest3},{},{}]
    } catch (err) {
      console.error('Error during login:', err);
    }
  };

  if (matchesClicked) {
    return (
      <div>
        <div className='profile-main-container'>
          <div className='title'>Your Matches</div>
          {matches.map((profile, index) => (
            <Profiles 
            name={profile.username} 
            interests={[profile.interest1, profile.interest2, profile.interest3]} 
            index={index} 
            />
          ))}
        </div>
      <button className='secondary' type='button' onClick={() => {setMatchesClicked(false)}}>
            Find New Matches
          </button>
        <Logout />
      </div>
    )
  }

  return (
    <div className='pref-container'>
      <div className='title'>Findr</div>
      <div className='quote'>
        <div>Whatchu want in your potential shawty?</div>
        Choose up to three interests:
      </div>
      <br />
      <Interest 
        number='First' 
        filteredInterests={filteredInterests[0]} 
        interestInput={interestInputs[0]} 
        handleChange={(e) => {handleInterestInputChange(e, 0)}}
        handleUserClick={(option) => {handleInterestClick(option, 0)}}
        filterInterestFunc={(value) => filterInterestOptions(value, 0)}
      /> 
      <Interest 
        number='Second' 
        filteredInterests={filteredInterests[1]} 
        interestInput={interestInputs[1]} 
        handleChange={(e) => {handleInterestInputChange(e, 1)}}
        handleUserClick={(option) => {handleInterestClick(option, 1)}}
        filterInterestFunc={(value) => filterInterestOptions(value, 1)}
      /> 
      <Interest 
        number='Third' 
        filteredInterests={filteredInterests[2]} 
        interestInput={interestInputs[2]} 
        handleChange={(e) => {handleInterestInputChange(e, 2)}}
        handleUserClick={(option) => {handleInterestClick(option, 2)}}
        filterInterestFunc={(value) => filterInterestOptions(value, 2)}
      /> 
      <button className='secondary' type='button' onClick={submitPreference}>
        Show me my potential matches
      </button>
      <Logout />
    </div>
  );
};

export default PrefPage;
