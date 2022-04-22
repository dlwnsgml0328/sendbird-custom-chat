import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import QuickStart from './pages/QuickStart';

import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/quick_start" element={<QuickStart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
