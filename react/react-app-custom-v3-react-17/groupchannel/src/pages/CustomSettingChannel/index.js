import React, { useState } from 'react';

import ChannelSettings from '@sendbird/uikit-react/ChannelSettings';
import SendbirdProvider from '@sendbird/uikit-react/SendbirdProvider';

import { APP_ID, NICKNAME, USER_ID } from '../QuickStart/const';

const CustomSettingChannel = () => {
  const [onSetting, setOnSetting] = useState(false);

  return (
    <div>
      <h1>CustomSettingChannel</h1>
      <SendbirdProvider appId={APP_ID} userId={USER_ID} nickname={NICKNAME}>
        <div className="setting_channel_wrap">
          <button type="button" onClick={() => setOnSetting(true)}>
            setting_channel
          </button>

          {onSetting && (
            <div>
              <ChannelSettings
                channelUrl={
                  'sendbird_group_channel_71230636_1df4a19deba53fd770774205b7b9db1673edb8ad'
                }
                onCloseClick={() => setOnSetting(false)}
              />
            </div>
          )}
        </div>
      </SendbirdProvider>
    </div>
  );
};

export default CustomSettingChannel;
