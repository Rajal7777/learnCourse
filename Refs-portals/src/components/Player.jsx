import { useState, useRef } from "react";

export default function Player() {
  //useRef to get input value get acess without re-rendering
  const inputPlayerName = useRef();
  const [enterPlayerName, setEnterPlayerName] = useState("");
  console.log(enterPlayerName)
  function handleClick() {
    setEnterPlayerName(inputPlayerName.current.value);
  }
  return (
    <section id="player">
      <h2>Welcome  { enterPlayerName ? enterPlayerName : "unknown entity"}</h2>
      <p>
        <input type="text" ref={inputPlayerName} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
