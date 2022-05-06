import React, { useState, useCallback, useEffect } from 'react';

import SendBirdCall from 'sendbird-calls';

import SendbirdProvider from '@sendbird/uikit-react/SendbirdProvider';
import SendbirdSelectors from '@sendbird/uikit-react/sendBirdSelectors';
import ChannelList from '@sendbird/uikit-react/ChannelList';
import { withSendBird } from '@sendbird/uikit-react';

import { ChannelProvider } from '@sendbird/uikit-react/Channel/context';
import ChannelUI from '@sendbird/uikit-react/Channel/components/ChannelUI';

// import { UserMessageCreateParams } from '@sendbird/chat/message';

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

  // useEffect(() => {
  //   if (ringing) {
  //     const userMessageParams = new UserMessageCreateParams();
  //     userMessageParams.message = '안녕하세요'
  //     selectedChannel.sendU
  //   }
  // }, [ringing]);

  return (
    <div>
      <h1>CustomChannelSDK</h1>
      <p>{selectedChannel || ''}</p>

      {loginDone ? (
        <SendbirdProvider appId={APP_ID} userId={caller} nickname={caller}>
          <div style={{ display: ' flex', height: '80vh', flexWrap: 'wrap' }}>
            {/* 채널 리스트 (좌) */}
            <div style={{ flex: 1 }}>
              <ChannelList onChannelSelect={onChannelSelect} />
            </div>
            {/* 채널 (우) */}
            <div style={{ flex: 3 }}>
              <ChannelProvider channelUrl={selectedChannel || ''}>
                <ChannelUI
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
              </ChannelProvider>
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
        <>
          <LoginForm
            caller={caller}
            setCaller={setCaller}
            setLoginDone={setLoginDone}
            SendBirdCall={SendBirdCall}
            isChat={true}
          />

          <h2>채팅 기능 사용하기</h2>
          <OrderWrapper>
            <li>같은 페이지를 두개 엽니다</li>
            <li>각각 다른 이름 (A/B) 을 입력합니다</li>
            <li>한 계정 (A or B) 에서 해당 계정을 초대합니다</li>
            <li>내부 기능을 사용합니다</li>
            <ul>
              <li>방에 인원이 2명일 경우, 전화하기 기능이 활성화됩니다</li>
              <li>
                전화하기 기능을 확인하고 싶은 경우, 휴대폰 (A) 과 브라우저 (B)
                를 이용합니다
              </li>
              <li>
                브라우저 (B) 에서 휴대폰 (A) 으로 전화하는 경우 가장 문제없이
                동작합니다
              </li>
            </ul>
          </OrderWrapper>
        </>
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

const OrderWrapper = styled.ol`
  padding: 0px 30px;

  li {
    margin-bottom: 1%;
  }

  ul {
    padding-left: 15px;
  }

  @media only screen and (max-width: 480px) {
    font-size: 3vw;
  }
`;

export default CustomChannelSDK;
