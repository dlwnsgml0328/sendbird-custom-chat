import React, { useState, useCallback, useEffect } from 'react';

import SendBirdCall from 'sendbird-calls';

import SendbirdProvider from '@sendbird/uikit-react/SendbirdProvider';
import SendbirdSelectors from '@sendbird/uikit-react/sendBirdSelectors';
import ChannelList from '@sendbird/uikit-react/ChannelList';
import Channel from '@sendbird/uikit-react/Channel';
import { withSendBird } from '@sendbird/uikit-react';

import styled from 'styled-components';

import { APP_ID } from '../../config/const';
import LoginForm from '../../components/LoginFormWithHOC';

const CustomChannelSDK = () => {
  // for call
  const [caller, setCaller] = useState('');
  // const [callee, setCallee] = useState('');

  const [loginDone, setLoginDone] = useState(false);
  // const [callDone, setCallDone] = useState(false);
  // const [isCall, setIsCall] = useState(false);

  // for chat
  const [selectedChannel, setSelectedChannel] = useState('');
  const [selectedChannelMember, setSelectedChannelMember] = useState([]);

  const onChannelSelect = useCallback((res) => {
    if (res) {
      console.log('res: ', res);
      setSelectedChannel(res.url);
      setSelectedChannelMember(res.members);
    } else {
      return;
    }
  }, []);

  const MyComponent = ({ sdk, connect, disconnect }) => {
    useEffect(() => sdk && console.log('@ sdk: ', sdk), [sdk]);

    return (
      <>
        <button
          onClick={() => {
            connect(caller)
              .then((res) => console.log('res: ', res))
              .catch((err) => console.log('error: ', err));
          }}
        >
          connect
        </button>
        <button onClick={() => disconnect()}>disconnect</button>
      </>
    );
  };

  const CustomComponentWithSendBird = withSendBird(MyComponent, (state) => {
    const sdk = SendbirdSelectors.getSdk(state);
    const disconnect = SendbirdSelectors.getDisconnect(state);
    const connect = SendbirdSelectors.getConnect(state);
    return { sdk, disconnect, connect };
  });

  useEffect(() => {
    if (selectedChannelMember.length === 2) {
      console.log('Direct call 사용 가능!', selectedChannelMember);
    }
  }, [selectedChannelMember]);

  return (
    <div>
      <h1>CustomChannelSDK</h1>
      <p>{selectedChannel || ''}</p>

      {loginDone ? (
        <SendbirdProvider appId={APP_ID} userId={caller} nickname={caller}>
          <div style={{ display: ' flex', height: '80vh' }}>
            <div style={{ flex: 1 }}>
              <ChannelList onChannelSelect={onChannelSelect} />
            </div>
            <div style={{ flex: 3 }}>
              <Channel
                channelUrl={selectedChannel || ''}
                renderChannelHeader={() => (
                  <CustomChannelHeader>
                    <CustomComponentWithSendBird />
                    <button
                      type="button"
                      onClick={() => window.alert('전화하기')}
                    >
                      전화하기
                    </button>
                  </CustomChannelHeader>
                )}
              />
            </div>
          </div>
        </SendbirdProvider>
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

const CustomChannelHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  padding-top: 2%;

  button {
    margin-right: 1%;
    border: 1px solid #fff;
    background: #742ddd;
    color: #fff;
    padding: 8px 12px;
    border-radius: 16px;

    cursor: pointer;
  }
`;

export default CustomChannelSDK;
