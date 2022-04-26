import React from 'react';

import SendbirdProvider from '@sendbird/uikit-react/SendbirdProvider';
import CreateChannel from '@sendbird/uikit-react/CreateChannel';

import { APP_ID, NICKNAME, USER_ID } from '../../config/const';
import { useState } from 'react';

const CustomCreateChannel = () => {
  const [onCreate, setOnCreate] = useState(false);
  const [info, setInfo] = useState();

  const onCreateChannel = (res) => {
    console.log('res: ', res);
    if (res.url) {
      setInfo({
        url: res.url,
        members: res.members,
        channelType: res.channelType,
      });
    }
  };
  return (
    <div>
      <h1>Create Channel</h1>
      <SendbirdProvider appId={APP_ID} userId={USER_ID} nickname={NICKNAME}>
        <div className="create_channel_wrap">
          <button type="button" onClick={() => setOnCreate(true)}>
            create_channel
          </button>

          {onCreate && (
            <CreateChannel
              onCreateChannel={onCreateChannel}
              onCancel={() => setOnCreate(false)}
            />
          )}

          {info ? <InfoRenderer info={info} /> : null}
        </div>
      </SendbirdProvider>
    </div>
  );
};

const InfoRenderer = ({ info }) => (
  <>
    <p>url : {info.url}</p>
    <p>channel type : {info.channelType}</p>
    <p>
      members:{' '}
      {info.members.map((member, key) => (
        <span
          key={key}
          style={{
            marginRight: '1%',
            border: '1px solid black',
            padding: '0.5%',
          }}
        >
          {member.nickname}
        </span>
      ))}
    </p>
  </>
);

export default CustomCreateChannel;

/**
 * members: Array(2)
0: r {nickname: 'miyeon', plainProfileUrl: '', userId: 'miyeon', connectionStatus: 'offline', lastSeenAt: 1650848334764, …}
1: r {nickname: 'junhee', plainProfileUrl: '', userId: 'junhee', connectionStatus: 'online', lastSeenAt: 0, …}
 */
