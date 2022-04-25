import React, { useState } from 'react';

import EditUserProfile from '@sendbird/uikit-react/EditUserProfile';
import SendbirdProvider from '@sendbird/uikit-react/SendbirdProvider';

import { APP_ID, NICKNAME, USER_ID } from '../QuickStart/const';

const CustomEditProfile = () => {
  const [onSetting, setOnSetting] = useState(false);

  return (
    <div>
      <h1>CustomEditProfile</h1>
      <SendbirdProvider appId={APP_ID} userId={USER_ID} nickname={NICKNAME}>
        <div className="setting_channel_wrap">
          <button type="button" onClick={() => setOnSetting(true)}>
            edits_profile
          </button>

          {onSetting && (
            <div>
              <EditUserProfile
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

export default CustomEditProfile;
