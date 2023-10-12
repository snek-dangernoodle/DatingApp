import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate()
  const handleLogOut = async (e) => {
    try{
      const response = await fetch('/database/logout');
      if (response.status === 200) {
        navigate('/');
      }
    } catch (err) {
    console.log('error:', err)
    }
  }

  return (
      <button type='button' id='logout' onClick={handleLogOut}>Sign Out</button>
  )
};

export default Logout;