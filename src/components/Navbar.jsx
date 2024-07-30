// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import "./Navbar.css";

// const Navbar = () => {
//   return (
//     <header className="header">
//         <NavLink to="/" className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md"> 
//         <p className="blue-gradient_text">AU</p>
//         </NavLink>
//         <nav className="flex text-lg gap-7 font-medium">
//           <NavLink to="/about" className= {({ isActive }) => isActive ?
//           'text-blue-500' : 'text-black'}>
//             About
//           </NavLink>
//         </nav>
//         <nav className="flex text-lg gap-7 font-medium">
//           <NavLink to="/projects" className= {({ isActive }) => isActive ?
//           'text-blue-500' : 'text-black'}>
//             Projects
//           </NavLink>
//         </nav>
//     </header>
//   )
// }

// export default Navbar

// export const Navbar = () => {
//   return (
//   <nav>
//      <ul>
//       <li>
//         <NavLink to= "/" exact activeClassName="active">
//         Home
//         </NavLink>
//       </li>
//       <li><NavLink to= "/about" activeClassName="active">
//       About</NavLink></li>
//       <li><NavLink to= "/projects" activeClassName="active">
//       Projects</NavLink></li>
//       <li><NavLink to= "/contacts"activeClassName="active">
//       Contact</NavLink></li>
//     </ul>
//   </nav>
//   )
// }

// export default Navbar

import { NavLink } from "react-router-dom";

import { logo } from "../assets/images";

const Navbar = () => {
  return (
    <header className='header'>
      <NavLink to='/'>
        <img src={logo} alt='logo' className='w-18 h-18 object-contain' />
      </NavLink>
      <nav className='flex text-lg gap-7 font-medium'>
        <NavLink to='/about' className={({ isActive }) => isActive ? "text-blue-600" : "text-black" }>
          About
        </NavLink>
        <NavLink to='/projects' className={({ isActive }) => isActive ? "text-blue-600" : "text-black"}>
          Projects
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;