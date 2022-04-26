import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import QuickStart from './pages/QuickStart';

import Header from './components/Header';

import './App.css';
import DateLocalization from './pages/DateLocalization';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/quickStart" element={<QuickStart />} />
      </Routes>
      <Routes>
        <Route path="/dateLocale" element={<DateLocalization />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
