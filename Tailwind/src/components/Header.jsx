import logo from '../assets/logo.png';



export default function Header() {
  return (
    <header className="flex flex-col items-center mt-16 mb-12  ">
     
      <img src={logo} alt="A canvas" className="mb-8 w-44 object-contain h-48 sm:mb-10 md:mb-16" />
      <h1 className='  sm:text-2xl  md:text-4xl text-amber-800 fontFamily tracking-widest text-center uppercase   '>React Art</h1>
      <p className='textcls'>A community of artists and art-lovers.</p>
    </header>
  );
}
