// index.js is the entry point of your React app. It's the file that tells React:
// What component to render (App)
// Where in the HTML to inject it (<div id="root"> in index.html)

// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// 1. Import React (core library for JSX and component rendering)
import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';

import Landing from './pages/Landing.js';
import Login from './pages/Login.js';
import Routines from './pages/Routines.js';
import EditRoutine from './pages/EditRoutine.js';
import PlayRoutine from './pages/PlayRoutine.js';
import About from './pages/OurTeam.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 5. Find the root DOM node in index.html to attach the React app to
const root = ReactDOM.createRoot(document.getElementById('root'));



// 6. Render the App component inside the root element
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" index element={<Landing />} />
        <Route path="/login" element={<Login />} />{" "}
        <Route path="/routines" element={<Routines />} />
        <Route path="/routines/edit" element={<EditRoutine />} />
        <Route path="/routines/play" element={<PlayRoutine />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
