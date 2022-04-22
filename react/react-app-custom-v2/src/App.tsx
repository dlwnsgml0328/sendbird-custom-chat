import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Channel from './pages/Channel';
import ChannelSettings from './pages/ChannelSettings';
import { ChannelCRUDSelectors } from './pages/CreateChannel';
import GetSDK from './pages/GetSDK';

import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sdk" element={<GetSDK />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/channel" element={<Channel />} />
        <Route path="/channel_settings" element={<ChannelSettings />} />
        <Route path="/channel_create" element={<ChannelCRUDSelectors />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
