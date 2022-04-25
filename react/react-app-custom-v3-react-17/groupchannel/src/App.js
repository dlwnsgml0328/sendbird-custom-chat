import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import QuickStart from './pages/QuickStart';
import CustomCreateChannel from './pages/CustomCreateChannel';
import CustomChannelList from './pages/CustomChannelList';
import CustomChannelList2 from './pages/CustomChannelList2';

import Header from './components/Header';
import CustomGroupChannel from './pages/CustomGroupChannel';
import CustomSettingChannel from './pages/CustomSettingChannel';
import CustomEditProfile from './pages/CustomEditProfile';

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
      <Routes>
        <Route path="/create_channel" element={<CustomCreateChannel />} />
      </Routes>
      <Routes>
        <Route path="/channel_list" element={<CustomChannelList />} />
      </Routes>
      <Routes>
        <Route path="/channel_list_2" element={<CustomChannelList2 />} />
      </Routes>
      <Routes>
        <Route path="/group_channel" element={<CustomGroupChannel />} />
      </Routes>
      <Routes>
        <Route path="/setting_channel" element={<CustomSettingChannel />} />
      </Routes>
      <Routes>
        <Route path="/edit_profile" element={<CustomEditProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
