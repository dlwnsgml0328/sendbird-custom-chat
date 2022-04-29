import React, { useState, useCallback, useEffect } from 'react';

import SendBirdCall from 'sendbird-calls';

import SendbirdProvider from '@sendbird/uikit-react/SendbirdProvider';
import SendbirdSelectors from '@sendbird/uikit-react/sendBirdSelectors';
import ChannelList from '@sendbird/uikit-react/ChannelList';
import Channel from '@sendbird/uikit-react/Channel';
import { withSendBird } from '@sendbird/uikit-react';

import styled from 'styled-components';

import { APP_ID } from '../../config/const';
import LoginForm from '../../components/LoginForm';
import CallView from '../../components/CallView';
import { CallBtn } from '../../components/Buttons/CallBtn';
import RingingView from '../../components/RingingView';

const CustomChannelSDK = () => {
  /* state */
  const [loginDone, setLoginDone] = useState(false);
  // call to someone
  const [isCall, setIsCall] = useState(false);
  // the state of a telephone ringing
  const [ringing, setRinging] = useState(false);

  /* for call */
  const [caller, setCaller] = useState('');
  const [callee, setCallee] = useState('');

  // for call context
  const [callCtx, setCallCtx] = useState();
  const [calleeCtx, setCalleeCtx] = useState();

  const [callerTime, setCallerTime] = useState(0);
  const [calleeTime, setCalleeTime] = useState(0);

  /* for chat */
  const [selectedChannel, setSelectedChannel] = useState('');
  const [selectedChannelMember, setSelectedChannelMember] = useState([]);

  /* inner function */
  const onChannelSelect = useCallback((res) => {
    if (res) {
      console.log('res: ', res);
      setSelectedChannel(res.url);
      setSelectedChannelMember(res.members);
    } else {
      return;
    }
  }, []);

  /* hoc */
  const MyComponent = ({ sdk, connect, disconnect }) => {
    // useEffect(() => sdk && console.log('@ sdk: ', sdk), [sdk]);

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

  /* componentDidUpdate */
  useEffect(() => {
    if (loginDone) {
      if (selectedChannelMember.length === 2) {
        console.log('Direct call 사용 가능!', selectedChannelMember);

        setCallee(
          selectedChannelMember.find((member) => member.nickname !== caller)
            .nickname,
        );
      } else {
        console.log('Direct call 사용 불가능 ㅜㅜ', selectedChannelMember);
      }
    } else {
      return;
    }
  }, [loginDone, selectedChannelMember, setCallee, caller]);

  useEffect(() => {
    if (loginDone & !ringing) {
      SendBirdCall.addListener(callee, {
        onRinging: (call) => {
          console.log('@ onRinging to receive: ', call);
          setRinging(true);
          setCalleeCtx(call);
        },
      });

      return () => {
        SendBirdCall.removeListener(callee, {
          onRinging: (call) => {
            console.log('@ onRinging to receive clean-up: ', call);
          },
        });
      };
    }
  }, [loginDone, ringing, callee]);

  return (
    <div>
      <h1>CustomChannelSDK</h1>
      <p>{selectedChannel || ''}</p>

      {loginDone ? (
        <SendbirdProvider appId={APP_ID} userId={caller} nickname={caller}>
          <div style={{ display: ' flex', height: '80vh' }}>
            {/* 채널 리스트 (좌) */}
            <div style={{ flex: 1 }}>
              <ChannelList onChannelSelect={onChannelSelect} />
            </div>
            {/* 채널 (우) */}
            <div style={{ flex: 3 }}>
              <Channel
                channelUrl={selectedChannel || ''}
                renderChannelHeader={() => (
                  <CustomChannelHeader>
                    <CustomComponentWithSendBird />
                    {/* 전화를 하기 위한 버튼 CallBtn (기존의 DialView 컴포넌트와 같은 용도) */}
                    {selectedChannelMember?.length === 2 ? (
                      <CallBtn
                        SendBirdCall={SendBirdCall}
                        callee={callee}
                        setIsCall={setIsCall}
                        setCallCtx={setCallCtx}
                        setCallerTime={setCallerTime}
                      />
                    ) : null}
                  </CustomChannelHeader>
                )}
              />
            </div>
          </div>
          {/* 전화를 거는 상황 */}
          {isCall && (
            <CallView
              callCtx={callCtx}
              calleeCtx={calleeCtx}
              setIsCall={setIsCall}
              callerTime={callerTime}
              calleeTime={calleeTime}
            />
          )}
          {/* 전화가 오는 상황 */}
          {ringing && (
            <RingingView
              calleeCtx={calleeCtx}
              setRinging={setRinging}
              setIsCall={setIsCall}
              setCalleeTime={setCalleeTime}
            />
          )}
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
