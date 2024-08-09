import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Gojo from './components/Gojo';
import Home from './components/Home';
import About from './components/About';
import Watch from './components/Watch';

const App = () => (
  <Routes>
    <Route path="/" element={<Gojo />} />
    <Route path="/home" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/watch/:id" element={<Watch />} />
  </Routes>
);

export default App;
