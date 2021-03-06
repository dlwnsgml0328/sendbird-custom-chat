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
        console.log('Direct call ?????? ??????!', selectedChannelMember);

        setCallee(
          selectedChannelMember.find((member) => member.nickname !== caller)
            .nickname,
        );
      } else {
        console.log('Direct call ?????? ????????? ??????', selectedChannelMember);
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
  //     userMessageParams.message = '???????????????'
  //     selectedChannel.sendU
  //   }
  // }, [ringing]);

  return (
    <AppWrapper>
      <h1>CustomChannelSDK</h1>
      <p>{selectedChannel || ''}</p>

      {loginDone ? (
        <SendbirdProvider appId={APP_ID} userId={caller} nickname={caller}>
          <div className="list_wrap" style={{}}>
            {/* ?????? ????????? (???) */}
            <div style={{ flex: 1 }}>
              <ChannelList onChannelSelect={onChannelSelect} />
            </div>
            {/* ?????? (???) */}
            <div style={{ flex: 3 }}>
              <ChannelProvider channelUrl={selectedChannel || ''}>
                <ChannelUI
                  channelUrl={selectedChannel || ''}
                  renderChannelHeader={() => (
                    <CustomChannelHeader>
                      <CustomComponentWithSendBird />
                      {/* ????????? ?????? ?????? ?????? CallBtn (????????? DialView ??????????????? ?????? ??????) */}
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
          {/* ????????? ?????? ?????? */}
          {isCall && (
            <CallView
              callCtx={callCtx}
              calleeCtx={calleeCtx}
              setIsCall={setIsCall}
              callerTime={callerTime}
              calleeTime={calleeTime}
            />
          )}
          {/* ????????? ?????? ?????? */}
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

          <h2>?????? ?????? ????????????</h2>
          <OrderWrapper>
            <li>?????? ???????????? ?????? ?????????</li>
            <li>?????? ?????? ?????? (A/B) ??? ???????????????</li>
            <li>??? ?????? (A or B) ?????? ?????? ????????? ???????????????</li>
            <li>?????? ????????? ???????????????</li>
            <ul>
              <li>?????? ????????? 2?????? ??????, ???????????? ????????? ??????????????????</li>
              <li>
                ???????????? ????????? ???????????? ?????? ??????, ????????? (A) ??? ???????????? (B)
                ??? ???????????????
              </li>
              <li>
                ???????????? (B) ?????? ????????? (A) ?????? ???????????? ?????? ?????? ????????????
                ???????????????
              </li>
            </ul>
          </OrderWrapper>
        </>
      )}
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  height: 85vh;

  h1 {
    margin-top: 0;
  }

  .list_wrap {
    display: flex;
    height: 100%;
    flex-wrap: wrap;

    @media only screen and (max-width: 480px) {
      height: 60vh;
      overflow-y: scroll;
    }
  }
`;

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
