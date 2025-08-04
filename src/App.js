// `App.js` is the main component of your React application. It serves as the top-level UI layout, 
// and it's the first thing rendered by index.js. Think of it like the `<body>` of a traditional
// HTML page — it controls what appears on screen.

// 1. Import React library (required to use JSX)
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 2. Import the CSS file for styling this component
import './styles/App.css';

// import pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Routines from './pages/Routines';
import EditRoutine from './pages/EditRoutine';
import PlayRoutine from './pages/PlayRoutine';
import OurTeam from './pages/OurTeam';

// Other imports for additional components


// 4. Define the App component using a function

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/routines" element={<Routines />} />
        <Route path="/edit/:id" element={<EditRoutine />} />
        <Route path="/play/:id" element={<PlayRoutine />} />
        <Route path="/team" element={<OurTeam />} />
      </Routes>
    </div>
  );
}
export default App;