import { useState } from 'react';
import Button from './Button';
import Input from './Input';

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === 'email') {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes('@');
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div id="auth-inputs" className='w-full max-w-sm p-8 rounded shadow-md bg-linear-to-b from-stone-800 to-stone-400'>
      <div className='flex flex-col gap-6 mb-2'>
               
        <Input
          label="Email"
          type="email"
          invalid={emailNotValid}
          onChange={(event) =>
            handleInputChange('email', event.target.value)
          } >
        </Input>
        <Input
          invalid={passwordNotValid}
          label="password"
          type="password"
          onChange={(event) =>
            handleInputChange('password', event.target.value)
          } >
        </Input>
      </div>
      <div className="flex justify-end gap-4">
       <button type="button" className='text-amber-400 hover:text-amber-600'>Create a new account</button>
        <Button type="button" onClick={handleLogin}>
          SIGN IN
        </Button>
      </div>
    </div>
  );
}
