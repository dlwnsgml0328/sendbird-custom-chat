import React from 'react'
import './App.css'

import { App as SendBirdApp } from 'sendbird-uikit'
import 'sendbird-uikit/dist/index.css'

function App() {
  return (
    <div className="App">
      <SendBirdApp
        appId={process.env.APP_ID}
        userId="sendbird"
        nickname="sendbird"
        theme="dark"
        profileUrl={
          'https://sendbird.com/wp-content/themes/sendbird-sb/assets/img/ic-main-sendbird-logo-white.svg'
        }
      />
    </div>
  )
}

export default App
