import React from 'react';
import { useNavigate } from 'react-router-dom';


const Profiles = ({ index, name, interests }) => {
  const navigate = useNavigate();
  
  return (
    <article className='profile-box'>
      <p>Name: {name}</p>
      <p>Shared interests: {interests.join(', ')}</p>
      <button type='button' id='connect' onClick={() => {navigate('/messenger')}}><u>DM ME!</u></button>
    </article>
  );
};
export default Profiles;
