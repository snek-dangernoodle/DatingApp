import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateState } from '../src/features/profileState/profileStateSlice';

const PrefPage = () => {
  // const currentState = useSelector((state) => state.profileState.)
  const dispatch = useDispatch();

  // useEffect(() => {
  //   fetchDatabase();
  // }, []);

  // const fetchDatabase = async () => {
  //   const res = await axios.get('http://localhost:3000/search');
  // };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log('hello');
    const result = await fetch('./storage.txt');
    console.log(result);
  };
  return (
    <div className="pref-container">
      <div className="title">Findr</div>
      <div className="quote"> Whatchu want in your potential shawty?</div>
      <form
        className="submit-form"
        action="http://localhost:3000/search"
        method="GET"
      >
        <label for="preference1">
          Preference 1:
          <input name="preference1" class="prefbox" id="pref-box-1" />
        </label>
        <label for="preference2">
          Preference 2:
          <input name="preference2" class="prefbox" id="pref-box-2" />
        </label>
        <label for="preference3">
          Preference 3:
          <input name="preference3" class="prefbox" id="pref-box-3" />
        </label>
        <button className="primary" type="submit">
          Match Me!
        </button>
      </form>
      <button className='secondary' onClick={handleClick}>
        Show me the hoes
      </button>
    </div>
  );
};

export default PrefPage;
