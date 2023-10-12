import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Interest = ({ number, 
    filteredInterests, 
    interestInput, 
    handleChange, 
    handleUserClick
}) => {
    return (
        <form autoComplete='off' className='submit-form'>
        <input
          className='input'
          id={number}
          type='text'
          placeholder={`${number} Interest`}
          value={interestInput}
          onChange={handleChange}
        />
        {filteredInterests.length > 0 && (
          <div className='autocomplete-items'>
            {filteredInterests.map((option, index) => (
              <div key={index} onClick={() => {handleUserClick(option)}}>
                {`${option.interest}`}
              </div>
            ))}
          </div>
        )}
      </form>
    )
}

export default Interest;