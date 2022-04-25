import React, { useEffect, useState } from 'react';
import Channel from '@sendbird/uikit-react/Channel';
import ChannelList from '@sendbird/uikit-react/ChannelList';
import SendBirdProvider from '@sendbird/uikit-react/SendbirdProvider';

import { APP_ID, NICKNAME, USER_ID } from '../QuickStart/const';

// immsi
import { useChannel } from '@sendbird/uikit-react/Channel/context';

const CustomGroupChannel = () => {
  const [selectedChannel, setSelectedChannel] = useState('');

  useEffect(() => {
    console.log('selectedChannel: ', selectedChannel);
  }, [selectedChannel]);

  const channelState = useChannel();
  console.log('useChannel:', channelState);

  const onChannelSelect = (res) => {
    if (res) {
      setSelectedChannel(res.url);
    } else {
      return;
    }
  };

  return (
    <div>
      <h1>Custom Group Channel</h1>
      <div style={{ display: 'flex', height: '88vh' }}>
        <SendBirdProvider appId={APP_ID} userId={USER_ID} nickname={NICKNAME}>
          <div className="channel_list_wrap" style={{ width: '26%' }}>
            <ChannelList onChannelSelect={onChannelSelect} />
          </div>
          <div className="channel_wrap" style={{ width: '74%' }}>
            <Channel
              channelUrl={selectedChannel || ''}
              showSearchIcon={true}
              onSearchClick={(res) => console.log('res: ', res)}
            />
          </div>
        </SendBirdProvider>
      </div>
    </div>
  );
};

export default CustomGroupChannel;
