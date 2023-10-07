import React from "react";

const PrefPage = () => {
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
    </div>
  );
};

export default PrefPage;
