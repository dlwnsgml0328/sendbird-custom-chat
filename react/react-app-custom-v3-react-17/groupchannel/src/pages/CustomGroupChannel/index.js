import React, { useState } from 'react';
import Channel from '@sendbird/uikit-react/Channel';
import ChannelList from '@sendbird/uikit-react/ChannelList';
import MessageSearchPannel from '@sendbird/uikit-react/MessageSearch';
import SendBirdProvider from '@sendbird/uikit-react/SendbirdProvider';

import { APP_ID, NICKNAME, USER_ID } from '../../config/const';
import ChannelSettings from '@sendbird/uikit-react/ChannelSettings';

import { CustomChannelHeaderContainer } from './stlye';

const CustomGroupChannel = () => {
  const [selectedChannel, setSelectedChannel] = useState('');
  const [onSearch, setOnSearch] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

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
          <div className="channel_list_wrap" style={{ flex: 1 }}>
            <ChannelList
              onChannelSelect={onChannelSelect}
              allowProfileEdit={true}
              onProfileEditSuccess={(res) => console.log('res: ', res)}
            />
          </div>
          <div className="channel_wrap" style={{ flex: 3 }}>
            <Channel
              renderChannelHeader={() => (
                <CustomChannelHeader
                  setOnSearch={setOnSearch}
                  setOnEdit={setOnEdit}
                />
              )}
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
          {onEdit && (
            <div className="edit_wrap">
              <ChannelSettings
                channelUrl={selectedChannel || ''}
                onCloseClick={() => setOnEdit(false)}
              />
            </div>
          )}
        </SendBirdProvider>
      </div>
    </div>
  );
};

// custom renderChannelHeader
const CustomChannelHeader = ({ setOnSearch, setOnEdit }) => (
  <CustomChannelHeaderContainer>
    <button type="button" onClick={() => setOnSearch(true)}>
      search
    </button>
    <button type="button" onClick={() => setOnEdit(true)}>
      Edit
    </button>
  </CustomChannelHeaderContainer>
);

export default CustomGroupChannel;

/**
 * Channel ???????????? ????????? ?????? svg??? ????????? ???, ?????? ??????????????? ???????????? ?????? ?????? ????????? ??????????????? Channel??? ???????????? props??? ???????????? ????????????
 * ????????? ???????????? ?????? ?????? ?????? ????????? ?????? ??????, ?????? ???????????? API??? ???????????? ?????? ????????? smart components??? ???????????? ????????? ??????????????? ??? ?????????
 */
