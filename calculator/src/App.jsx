import { useState } from "react";
import Header from "./components/Header";
import UserInput from "./components/UserInput";
import Result from "./components/Result";

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 0,
    annualInvestment: 0,
    expectedReturn: 0,
    duration: 0,
  });

  function handleChange(inputIdentifier, newValue) {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        [inputIdentifier]: +newValue,
      };
    });
  }

  const validInput = userInput.initialInvestment > 0 && userInput.duration > 0;

  return (
    <>
      <Header />
      <UserInput onChange={handleChange} userInput={userInput} />
      {!validInput && <p className="center">Please enter a valid amount.</p>}
      {validInput && <Result userInput={userInput} />}
    </>
  );
}

export default App;
