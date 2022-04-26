import React, { useState } from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './Login';
import Chat from './Chat';

// react-app-composed

function App() {
  const [config, setconfig] = useState({
    userId: 'junhee',
    nickname: 'junhee',
    theme: 'dark',
  });
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/chat">
            <Chat
              userId={config.userId}
              nickname={config.nickname}
              theme={config.theme}
            />
          </Route>
          <Route path="/">
            <Login config={config} onSubmit={setconfig} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
