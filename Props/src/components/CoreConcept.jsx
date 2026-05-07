import { CORE_CONCEPTS } from "../data";
import Concept from "./Concept";
import Section from "./Section";


export default function CoreConcept(){
    return(
        <Section title="Core Concepts" id="core-concepts">
         <ul>
           { CORE_CONCEPTS.map((item) => <Concept key={item.title} {...item} />) }
          </ul>
        </Section>
    )
}