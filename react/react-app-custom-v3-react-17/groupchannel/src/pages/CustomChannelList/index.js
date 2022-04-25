import React from 'react';

import ChannelList from '@sendbird/uikit-react/ChannelList';
import SendBirdProvider from '@sendbird/uikit-react/SendbirdProvider';

import { APP_ID, NICKNAME, USER_ID } from '../QuickStart/const';

const CustomChannelList = () => (
  <div>
    <h1>ChannelList</h1>
    <SendBirdProvider appId={APP_ID} userId={USER_ID} nickname={NICKNAME}>
      <div className="channel_list_wrap">
        <ChannelList />
      </div>
    </SendBirdProvider>
  </div>
);

export default CustomChannelList;

/**
 * Provider 를 통해 감싸야 appId와 같은 고유 값을 통해 다른 기능을 사용할 수 있다
 *
 * ChannelList 를 사용할 경우 내부 코드 상으로 ChannelListProvider와 ChannelListUI 가 들어있다
 *
 * 비교를 위해서 CustomChannelList2 폴더를 만들어 놓음
 */
