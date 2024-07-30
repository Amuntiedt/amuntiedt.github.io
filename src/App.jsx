// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// import React from 'react'
// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import { Home, About, Projects, Contact} from './pages';
// import Navbar from './components/Navbar';
 
// const App = () => {
//   return (
//     <main className="bg-slate-300/20">
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} /> 
//           <Route path="/projects" element={<Projects />} /> 
//           <Route path="/contact" element={<Contact />} /> 
//         </Routes>
//       </Router>
//     </main>

//   )
// }

// export default App

/* <main className="bg-slate-300/20">
<Router>
  <Navbar />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} /> 
    <Route path="/projects" element={<Projects />} /> 
    <Route path="/contact" element={<Contact />} /> 
  </Routes>
</Router>
</main> */

//import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import "./App.css";
import Navbar from "./components/Navbar";
import {About, Home, Projects, Contact} from "./pages";

function App () {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/three-scene" element={<ThreeScene />} />
      </Routes>
    </div>
  );
}

export default App; 