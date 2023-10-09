import React from 'react';

const Profiles = (props) => {
  return (
    <div className='profile-box'>
      <p>Name: {props.profile[props.index].username}</p>
      <p>Shared interests: {props.profile[props.index].interest}</p>
      <a id='connect' href='http://localhost:8080/connect'>
        Connect with Me!
      </a>
    </div>
  );
};
export default Profiles;
