import TabButton from "./TabButton.jsx";
import Section from "./Section.jsx";
import { useState } from "react";
import { EXAMPLES } from "../data.js";


export default function EXAMPLE() {
  const [showExample, setShowExample] = useState();

  function handleClick(btnParameter) {
    setShowExample(btnParameter);
    console.log(btnParameter, 'clicked');
  }

  return (
    <Section title="Examples" id="examples">
  
      <menu>
        <TabButton isSelected={showExample === 'components'} handleClick={() => handleClick('components')}>Component</TabButton>
        <TabButton isSelected={showExample === 'jsx'} handleClick={() => handleClick('jsx')}>Jsx</TabButton>
        <TabButton isSelected={showExample === 'props'} handleClick={() => handleClick('props')}>Props</TabButton>
        <TabButton isSelected={showExample === 'state'} handleClick={() => handleClick('state')}>State</TabButton>
      </menu>
      {!showExample && <p>Please selecte the topic.</p>}
      {showExample &&
        <div id="tab-content">
          <h3>{EXAMPLES[showExample].title}</h3>
          <p>{EXAMPLES[showExample].description}</p>
          <pre>{EXAMPLES[showExample].code}</pre>
        </div>
      }
    </Section>

  );
}