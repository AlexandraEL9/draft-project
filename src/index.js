import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import Landing from './pages/landing.js';
import Login from './pages/loginSignup.js';
//import Routines from './pages/routines.js';
import EditRoutine from './pages/editRoutine.js';
import PlayRoutine from './pages/playRoutine.js';
import About from './pages/about.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" index element={<Landing />} />
        <Route path="/login" element={<Login />} />{" "}
        {/*<Route path="/routines" element={<Routines />} />*/}
        <Route path="/routines/edit" element={<EditRoutine />} />
        <Route path="/routines/play" element={<PlayRoutine />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();