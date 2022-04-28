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
      <div style={{ display: 'flex' }}>
        <SendbirdProvider appId={APP_ID} userId={USER_ID} nickname={NICKNAME}>
          <div className="open_channel_wrap" style={{ width: '80%' }}>
            <OpenChannel
              channelUrl="sendbird_open_channel_5498_606c443eaa04ca014809543fc8ca5b4d66b77ebd"
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
                channelUrl="sendbird_open_channel_5421_28b188dfdb108b82d19df42785fa7f9d3179de71"
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
