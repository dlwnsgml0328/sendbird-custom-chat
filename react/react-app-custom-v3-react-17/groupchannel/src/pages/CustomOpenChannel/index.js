import React, { useState } from 'react';
import SendbirdProvider from '@sendbird/uikit-react/SendbirdProvider';

import OpenChannel from '@sendbird/uikit-react/OpenChannel';
import OpenChannelSettings from '@sendbird/uikit-react/OpenChannelSettings';

import { APP_ID, NICKNAME, USER_ID } from '../../config/const';

const CustomOpenChannel = () => {
  const [onEdit, setOnEdit] = useState(false);
  return (
    <div>
      <h1>CustomOpenChannel</h1>
      <div style={{ display: 'flex', height: '90vh' }}>
        <SendbirdProvider appId={APP_ID} userId={USER_ID} nickname={NICKNAME}>
          <div className="open_channel_wrap" style={{ width: '80%' }}>
            <OpenChannel
              channelUrl="sendbird_open_channel_5482_01b6ec103bd4aa9dc754cbaba6bbd12c30df7e14"
              renderHeader={() => (
                <div>
                  <button type="button" onClick={() => setOnEdit(true)}>
                    Edit channel
                  </button>
                </div>
              )}
            />
          </div>
          {onEdit && (
            <div className="open_channel_edit_wrap">
              <OpenChannelSettings
                channelUrl="sendbird_open_channel_5482_01b6ec103bd4aa9dc754cbaba6bbd12c30df7e14"
                onCloseClick={() => setOnEdit(false)}
              />
            </div>
          )}
        </SendbirdProvider>
      </div>
    </div>
  );
};

export default CustomOpenChannel;
