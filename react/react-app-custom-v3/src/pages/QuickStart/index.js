import React from 'react';
import SendBirdProvider from '@sendbird/uikit-react/SendbirdProvider';
import '@sendbird/uikit-react/dist/index.css';

import CustomizedApp from './CustomizedApp';
import './styles.css';

import { APP_ID, USER_ID, NICKNAME } from './const';

export default function QuickStart() {
  if (!APP_ID) {
    return <p>Set APP_ID in const.js</p>;
  }
  return (
    <SendBirdProvider appId={APP_ID} userId={USER_ID} nickname={NICKNAME}>
      <CustomizedApp />
    </SendBirdProvider>
  );
}
