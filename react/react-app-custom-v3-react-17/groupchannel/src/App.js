import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';

import Home from './pages/Home';
import QuickStart from './pages/QuickStart';
import CustomCreateChannel from './pages/CustomCreateChannel';
import CustomChannelList from './pages/CustomChannelList';
import CustomChannelList2 from './pages/CustomChannelList2';
import CustomGroupChannel from './pages/CustomGroupChannel';
import CustomSettingChannel from './pages/CustomSettingChannel';
import CustomEditProfile from './pages/CustomEditProfile';
import CustomOpenChannel from './pages/CustomOpenChannel';
import CustomCall from './pages/CustomCall';
import CustomDirectCall from './pages/CustomDirectCall';
import CustomChatWithCall from './pages/CustomChatWithCall';
import CustomDirectCall2 from './pages/CustomDirectCall_v2';
import CustomChannelSDK from './pages/CustomChannelSDK';
import CustomGroupCall from './pages/CustomGroupCall';
import QuickStartContents from './pages/QuickStartContents';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/quick_start_contents" element={<QuickStartContents />} />
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
        <Route path="/open_channel" element={<CustomOpenChannel />} />
      </Routes>
      <Routes>
        <Route path="/setting_channel" element={<CustomSettingChannel />} />
      </Routes>
      <Routes>
        <Route path="/edit_profile" element={<CustomEditProfile />} />
      </Routes>
      <Routes>
        <Route path="/group_call" element={<CustomCall />} />
      </Routes>
      <Routes>
        <Route path="/custom_group_call" element={<CustomGroupCall />} />
      </Routes>
      <Routes>
        <Route path="/direct_call" element={<CustomDirectCall />} />
      </Routes>
      <Routes>
        <Route path="/direct_call_2" element={<CustomDirectCall2 />} />
      </Routes>

      <Routes>
        <Route path="/custom_chat_call" element={<CustomChatWithCall />} />
      </Routes>
      <Routes>
        <Route path="/custom_channel_sdk" element={<CustomChannelSDK />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
