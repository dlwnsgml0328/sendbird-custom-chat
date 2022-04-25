import React, { useEffect, useState } from 'react';
import Channel from '@sendbird/uikit-react/Channel';
import ChannelList from '@sendbird/uikit-react/ChannelList';
import MessageSearchPannel from '@sendbird/uikit-react/MessageSearch';
import SendBirdProvider from '@sendbird/uikit-react/SendbirdProvider';

import { APP_ID, NICKNAME, USER_ID } from '../QuickStart/const';

const CustomGroupChannel = () => {
  const [selectedChannel, setSelectedChannel] = useState('');
  const [onSearch, setOnSearch] = useState(false);

  useEffect(() => {
    console.log('selectedChannel: ', selectedChannel);
  }, [selectedChannel]);

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
            <ChannelList
              onChannelSelect={onChannelSelect}
              allowProfileEdit={true}
              onProfileEditSuccess={(res) => console.log('res: ', res)}
            />
          </div>
          <div className="channel_wrap" style={{ width: '74%' }}>
            <Channel
              channelUrl={selectedChannel || ''}
              showSearchIcon={true}
              onSearchClick={() => setOnSearch(true)}
            />
          </div>
          {onSearch && (
            <div className="search_wrap">
              <MessageSearchPannel
                channelUrl={selectedChannel || ''}
                onResultClick={(res) => console.log('res: ', res)}
                onCloseClick={() => setOnSearch(false)}
              />
            </div>
          )}
        </SendBirdProvider>
      </div>
    </div>
  );
};

export default CustomGroupChannel;

/**
 * Channel 컴포넌트 내부의 검색 svg에 접근할 때, 해당 컴포넌트로 접근하는 것이 아닌 최상위 컴포넌트인 Channel에 존재하는 props를 바탕으로 연결한다
 * 따라서 세부적인 기능 추가 또는 변경이 있을 경우, 먼저 제공되는 API를 확인하고 없을 경우에 smart components로 넘어가는 방향을 생각해봐야 할 것이다
 */
