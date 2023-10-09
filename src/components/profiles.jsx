import React from 'react';

const Profiles = (props) => {
  return (
    <div className='profile-box'>
      <p>{props.profile[props.index].username}</p>
      <p>{props.profile[props.index].interest}</p>
    </div>
  );
};
export default Profiles;
