import { useState } from 'react';

export default function StateLogin() {
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: '',
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });
  console.log("StateLogin:",enteredValues, didEdit);

  const emailIsInvalid = didEdit.email && !enteredValues.email.includes('@');

  //prevent default behaviour 
  function handleSubmit(event) {
    event.preventDefault();
    console.log(enteredValues);
  }

  //[identifier]: value for dynamic property name in the state object
  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));

    setDidEdit((prev) => ({
      ...prev,
      [identifier]: false,
    }));
  }

  function handleInputBlur(identifier){
    setDidEdit((prev) => ({
      ...prev,
      [identifier]: true
    }))
  }

  // function handleEmailChange(event) {
  //   setEnteredEmail(event.target.value);
  // }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          {/* onBlur is a React event that runs when an input loses focus. */}
          <input
            id="email"
            type="email"
            name="email"
            onBlur={() => handleInputBlur('email')}
            onChange={(event) => handleInputChange('email', event.target.value)}
            value={enteredValues.email}
          />
        </div>

        <div className="control-error">
          {emailIsInvalid && <p>Please enter a valid email adress.</p> }
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(event) =>
              handleInputChange('password', event.target.value)
            }
            value={enteredValues.password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button  className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}