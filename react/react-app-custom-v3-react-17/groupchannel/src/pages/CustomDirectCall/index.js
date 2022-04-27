import React, { useCallback, useEffect, useState } from 'react';
import SendBirdCall from 'sendbird-calls';

import LoginForm from '../../components/LoginForm';

const CustomDirectCall = () => {
  const [caller, setCaller] = useState('');
  const [callee, setCallee] = useState('');

  const [loginDone, setLoginDone] = useState(false);
  const [isCall, setIsCall] = useState(false);

  // Todo: login 눌렀을 때 인가를 먼저 받는 식으로 작업해야 할 듯 지금 구조 상으로는 웹소켓 연결 이후 call 기능에서 문제가 생긴다

  // 전화 걸기
  const call = useCallback(() => {
    if (callee) {
      const dialParams = {
        userId: callee,
        isVideoCall: true,
        callOption: {
          localMediaView: document.getElementById('local_video_element_id'),
          remoteMediaView: document.getElementById('remote_video_element_id'),
          audioEnabled: true,
          videoEnabled: true,
        },
      };

      const call = SendBirdCall.dial(dialParams, (call, error) => {
        if (error) {
          console.log('error occured in call', error);
        } else {
          console.log('success call process', call);
          setIsCall(true);
        }
      });

      call.onEstablished = (call) => {
        console.log('caller onEstablished', call);
      };

      call.onConnected = (call) => {
        console.log('caller onConnected', call);
      };

      call.onEnded = (call) => {
        console.log('caller onEnded', call);
      };

      call.onRemoteAudioSettingsChanged = (call) => {
        console.log('caller onRemoteAudioSettingsChanged', call);
      };

      call.onRemoteVideoSettingsChanged = (call) => {
        console.log('caller onRemoteVideoSettingsChanged', call);
      };
    }
  }, [callee]);

  // 전화 받기
  const end = useCallback(() => {
    if (callee) {
      const dialParams = {
        userId: callee,
        isVideoCall: true,
        callOption: {
          localMediaView: document.getElementById('local_video_element_id'),
          remoteMediaView: document.getElementById('remote_video_element_id'),
          audioEnabled: true,
          videoEnabled: true,
        },
      };

      SendBirdCall.dial(dialParams, (call, error) => {
        if (error) {
          console.log('error occured in call', error);
        } else {
          call.end();
          setLoginDone(false);
          setIsCall(false);
          setCallee('');
        }
      });
    }
  }, [callee]);

  const acceptCall = (call) => {
    call.onEstablished = (call) => {
      console.log('callee onEstablished', call);
    };

    call.onConnected = (call) => {
      console.log('callee onConnected', call);
    };

    call.onEnded = (call) => {
      console.log('callee onEnded', call);
    };

    call.onRemoteAudioSettingsChanged = (call) => {
      console.log('callee onRemoteAudioSettingsChanged', call);
    };

    call.onRemoteVideoSettingsChanged = (call) => {
      console.log('callee onRemoteVideoSettingsChanged', call);
    };

    const acceptParams = {
      callOption: {
        localMediaView: document.getElementById('local_video_element_id'),
        remoteMediaView: document.getElementById('remote_video_element_id'),
        audioEnabled: true,
        videoEnabled: true,
      },
    };

    call.accept(acceptParams);
  };

  useEffect(() => {
    if (loginDone) {
      SendBirdCall.addListener(callee, {
        onRinging: (call) => {
          acceptCall(call);
        },
      });

      return () => {
        SendBirdCall.removeListener(callee, {
          onRinging: (call) => {
            acceptCall(call);
          },
        });
      };
    }
  }, [loginDone, callee]);

  return (
    <div>
      <h1>Custom direct call</h1>

      {loginDone ? (
        <>
          <div
            style={{
              border: '1px solid black',
              padding: '1%',
              width: '30%',
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <div>
              <input
                style={{ width: '80%' }}
                type="text"
                value={callee}
                placeholder="전화할 상대방 id를 입력해주세요"
                onChange={(e) => setCallee(e.target.value)}
              />
            </div>
            <div style={{ marginTop: '5%' }}>
              {!isCall ? (
                <button type="button" onClick={() => call()}>
                  call
                </button>
              ) : (
                <button type="button" onClick={() => end()}>
                  disconnect call
                </button>
              )}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              marginTop: '5%',
            }}
          >
            {/* caller */}
            <div
              style={{
                width: '45%',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span>caller: {caller}</span>
              <video
                id="local_video_element_id"
                autoPlay
                style={{ width: '100%' }}
              ></video>
            </div>
            {/* callee */}
            <div
              style={{
                width: '45%',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span>callee: {callee}</span>
              <video
                id="remote_video_element_id"
                autoPlay
                style={{ width: '100%' }}
              ></video>
            </div>
          </div>
        </>
      ) : (
        <LoginForm
          caller={caller}
          setCaller={setCaller}
          setLoginDone={setLoginDone}
          SendBirdCall={SendBirdCall}
        />
      )}
    </div>
  );
};

export default CustomDirectCall;
