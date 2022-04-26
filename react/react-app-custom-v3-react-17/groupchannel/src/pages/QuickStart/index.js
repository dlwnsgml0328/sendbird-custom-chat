import React from 'react';
import SendBirdProvider from '@sendbird/uikit-react/SendbirdProvider';
import '@sendbird/uikit-react/dist/index.css';

import './styles.css';

import { APP_ID, USER_ID, NICKNAME } from '../../config/const';
import CustomizedApp from '../../components/CustomizedApp';

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
