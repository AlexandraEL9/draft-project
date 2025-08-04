// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/App.css';

import Layout from './components/Layout';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Routines from './pages/Routines';
import EditRoutine from './pages/EditRoutine';
import PlayRoutine from './pages/PlayRoutine';
import OurTeam from './pages/OurTeam';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/routines" element={<Routines />} />
          <Route path="/edit/:id" element={<EditRoutine />} />
          <Route path="/play/:id" element={<PlayRoutine />} />
          <Route path="/team" element={<OurTeam />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
