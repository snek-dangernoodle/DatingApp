import React from 'react';
import { useHistory } from 'react-router-dom';


const Profiles = ({ index, name, interests }) => {
  const history = useHistory();
  return (
    <article className='profile-box'>
      <p>Name: {name}</p>
      <p>Shared interests: {interests.join(', ')}</p>
      <button type='button' id='connect' onClick={() => {history.push('/messenger')}}><u>DM ME!</u></button>
    </article>
  );
};
export default Profiles;
