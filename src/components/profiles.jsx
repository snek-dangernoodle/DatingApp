import React from 'react';

const Profiles = (props) => {
  return (
    <div className='profile-box'>
      <p>Name: {props.profile[props.index].username}</p>
      <p>Shared interests: {props.profile[props.index].interest}</p>
      <p id='connect'><u>Connect with Me!</u></p>
    </div>
  );
};
export default Profiles;
