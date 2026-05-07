import logo from '../assets/Investment-Calculator-Logo.png';

export default function Header() {
    return (
       <header id='header'>
        <img  src={logo} alt="Investment Calculator Logo" />
        <h1>React Investment Calculator</h1>
       </header>
    )
};