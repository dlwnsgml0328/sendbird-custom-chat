import { withSendBird, sendBirdSelectors } from '@sendbird/uikit-react';
import Channel from '@sendbird/uikit-react/Channel';
import ChannelList from '@sendbird/uikit-react/ChannelList';
import SendbirdProvider from '@sendbird/uikit-react/SendbirdProvider';
import React, { useCallback, useEffect, useState } from 'react';
import SendBirdCall from 'sendbird-calls';

import LoginForm from '../../components/LoginForm';
import { APP_ID } from '../../config/const';

// Todo: login과 동시에 sendbird provider(chat), sendbird call 초기화

const CustomChatWithCall = () => {
  // for call
  const [caller, setCaller] = useState('');
  // const [callee, setCallee] = useState('');

  const [loginDone, setLoginDone] = useState(false);
  // const [callDone, setCallDone] = useState(false);
  // const [isCall, setIsCall] = useState(false);

  // for chat
  const [selectedChannel, setSelectedChannel] = useState('');

  const onChannelSelect = useCallback((res) => {
    if (res) {
      setSelectedChannel(res.url);
    } else {
      return;
    }
  }, []);

  const Welcome = ({ currentUser, sdk }) => {
    console.log('currentUser', currentUser);
    console.log('sdk', sdk);

    useEffect(() => {
      if (sdk) console.log('sdk.memeber', sdk.isSessionOpened);
    }, [sdk]);
    return <></>;
  };

  const WelcomeWithSendBird = withSendBird(Welcome, (state) => {
    const sdk = sendBirdSelectors.getSdk(state);
    const currentUser = sdk && sdk.getCurrentUserId && sdk.getCurrentUserId();
    return { currentUser, sdk };
  });

  return (
    <div>
      <h1>Custom chat with call</h1>

      {loginDone && caller ? (
        <div style={{ display: 'flex', height: '88vh', width: '100%' }}>
          <SendbirdProvider appId={APP_ID} userId={caller} nickname={caller}>
            <WelcomeWithSendBird />
            <div className="channel_list_wrap" style={{ flex: 1 }}>
              <ChannelList onChannelSelect={onChannelSelect} />
            </div>
            <div className="channel_wrap" style={{ flex: 3 }}>
              <Channel
                channelUrl={selectedChannel || ''}
                renderChannelHeader={() => (
                  <div>
                    <button>click me!</button>
                  </div>
                )}
              />
            </div>
          </SendbirdProvider>
        </div>
      ) : (
        <LoginForm
          caller={caller}
          setCaller={setCaller}
          setLoginDone={setLoginDone}
          SendBirdCall={SendBirdCall}
          isChat={true}
        />
      )}
    </div>
  );
};

export default CustomChatWithCall;
