

const HomeSearchForm = () => {
  return (
    <div className="home-search-div">
      <div className="w-form">
        <form
          id="email-form"
          name="email-form"
          data-name="Email Form"
          action="https://hur-kan.com" // Replace with your form action
          method="get"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="w-clearfix">
            <label htmlFor="node" className="home-search-label">
              Search Keyword
            </label>
            <input
              className="home-search-keyword w-input"
              maxLength={256}
              name="field"
              data-name="field"
              placeholder=""
              type="text"
              id="node"
            />
            <div className="flex space-x-4 mt-2">
              <label className="home-search-radio-button w-clearfix w-radio">
                <input
                  type="radio"
                  name="HolidayType"
                  id="Honeymoon"
                  className="w-form-formradioinput home-search-radio w-radio-input"
                  value="Honeymoon"
                />
                <span className="home-search-radio-label w-form-label">
                  Honeymoon
                </span>
              </label>
              <label className="home-search-radio-button w-clearfix w-radio">
                <input
                  type="radio"
                  name="HolidayType"
                  id="Anniversary"
                  className="w-form-formradioinput home-search-radio w-radio-input"
                  value="Anniversary"
                />
                <span className="home-search-radio-label w-form-label">
                  Anniversary
                </span>
              </label>
            </div>
          </div>
          <div className="w-clearfix">
            <label htmlFor="field" className="home-search-label">
              Check In
            </label>
            <select
              id="field"
              name="field"
              data-name="field"
              className="home-search-day w-select"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <select
              id="field-2"
              name="field-2"
              data-name="Field 2"
              className="home-search-month w-select"
            >
              <option value="1">Ocak</option>
              <option value="2">Şubat</option>
              <option value="3">Mart</option>
            </select>
          </div>
          <div className="w-clearfix">
            <label htmlFor="field-3" className="home-search-label">
              Check Out
            </label>
            <select
              id="field-3"
              name="field-3"
              data-name="Field 3"
              className="home-search-day w-select"
            >
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <select
              id="field-6"
              name="field-6"
              data-name="Field 6"
              className="home-search-month w-select"
            >
              <option value="1">Ocak</option>
              <option value="2">Şubat</option>
              <option value="3">Mart</option>
            </select>
          </div>
          <div className="flex justify-end items-center mt-4">
            <input
              type="submit"
              className="home-search-button w-button"
              value="Bul"
            />
          </div>
        </form>
        <div className="w-form-done" tabIndex={-1} role="region" aria-label="Email Form success">
          <p>Thank you! Your submission has been received!</p>
        </div>
        <div className="w-form-fail" tabIndex={-1} role="region" aria-label="Email Form failure">
          <p>Oops! Something went wrong while submitting.</p>
        </div>
      </div>
    </div>
  );
};

export default HomeSearchForm;
