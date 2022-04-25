import React from 'react';

import SendBirdProvider from '@sendbird/uikit-react/SendbirdProvider';

import { ChannelListProvider } from '@sendbird/uikit-react/ChannelList/context';
import ChannelListUI from '@sendbird/uikit-react/ChannelList/components/ChannelListUI';

import { APP_ID, NICKNAME, USER_ID } from '../QuickStart/const';

const CustomChannelList2 = () => (
  <div>
    <h1>ChannelList</h1>
    <SendBirdProvider appId={APP_ID} userId={USER_ID} nickname={NICKNAME}>
      <div className="channel_list_wrap">
        <ChannelListProvider>
          <ChannelListUI />
        </ChannelListProvider>
      </div>
    </SendBirdProvider>
  </div>
);

export default CustomChannelList2;

/**
 * Provider 를 통해 감싸야 appId와 같은 고유 값을 통해 다른 기능을 사용할 수 있다.
 *
 * ChannelList 를 사용할 경우 내부 코드 상으로 ChannelListProvider와 ChannelListUI 가 들어있다
 *
 *
 */
