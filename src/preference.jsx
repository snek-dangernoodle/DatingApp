import React from "react";

const PrefPage = () => {
  return (
    <div className="pref-container">
      <div className="title">Findr</div>
      <div className="quote">
        <div>Whatchu want in your potential shawty? </div>
        Choose up to three interests:
      </div>
      <form
        className="submit-form"
        action="http://localhost:3000/search"
        method="GET"
      >
        <label for="preference1">
          <input
            name="preference1"
            class="prefbox"
            placeholder="Your first interest..."
            id="pref-box-1"
          />
        </label>
        <label for="preference2">
          <input
            name="preference2"
            class="prefbox"
            placeholder="Your second interest..."
            id="pref-box-2"
          />
        </label>
        <label for="preference3">
          <input
            name="preference3"
            class="prefbox"
            placeholder="Your third interest..."
            id="pref-box-3"
          />
        </label>
        <div style={{ whiteSpace: "pre" }}>
          <button className="primary" type="submit">
            Match Me!
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrefPage;
