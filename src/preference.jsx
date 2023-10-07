import React from 'react';

const PrefPage = () => {
  return (
    <div className='pref-container'>
      <div className='title'>Placeholder for Title</div>
      <div className='quote'> Whatchu want in your potential shawty?</div>
      <form>
        <label for='preference1'>
          Preference 1:
          <input name='preference1' id='pref-box-1' />
        </label>
        <label for='preference2'>
          Preference 2:
          <input name='preference2' id='pref-box-2' />
        </label>
        <label fr='preference3'>
          Preference 3:
          <input name='preference3' id='pref-box-3' />
        </label>
      </form>
    </div>
  );
};

export default PrefPage;
