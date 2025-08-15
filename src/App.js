// App.js
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
        {/* All pages wrapped by Layout (Navbar + Footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/routines" element={<Routines />} />
          <Route path="/routines/edit/:id" element={<EditRoutine />} />
          <Route path="/routines/play/:id" element={<PlayRoutine />} />
          <Route path="/team" element={<OurTeam />} />
          {/* Optional 404 fallback */}
          <Route path="*" element={<div style={{padding:'2rem'}}>Page not found</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
