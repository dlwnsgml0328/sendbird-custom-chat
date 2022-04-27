import React, { useCallback, useEffect, useState } from 'react';
import SendBirdCall from 'sendbird-calls';

import LoginForm from '../../components/LoginForm';

const CustomDirectCall = () => {
  const [caller, setCaller] = useState('');
  const [callee, setCallee] = useState('');

  const [localCallee, setLocalCallee] = useState('');

  const [loginDone, setLoginDone] = useState(false);
  const [isCall, setIsCall] = useState(false);

  // Todo: callee: 전화받는 사람의 입장에서의 로직 흐름 제어가 원활하지 않다

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

      SendBirdCall.dial(dialParams, (call, error) => {
        if (error) {
          console.log('error occured in call', error);
          return;
        }

        console.log('success call process', call);
        setIsCall(true);

        // const time = setInterval(() => {
        //   console.log(Math.floor(Number(call.getDuration() / 1000)) + '초');
        // }, [1000]);

        call.onEstablished = (call) => {
          console.log('caller onEstablished', call);
        };

        call.onConnected = (call) => {
          console.log('caller onConnected', call);
        };

        call.onEnded = (call) => {
          console.log('caller onEnded', call);
          // clearInterval(time);
        };

        call.onRemoteAudioSettingsChanged = (call) => {
          console.log('caller onRemoteAudioSettingsChanged', call);
        };

        call.onRemoteVideoSettingsChanged = (call) => {
          console.log('caller onRemoteVideoSettingsChanged', call);
        };
      });
    }
  }, [callee]);

  // 전화 끊기
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

  // 전화 받기
  const acceptCall = useCallback((call) => {
    // const time = setInterval(() => {
    //   console.log(Math.floor(Number(call.getDuration() / 1000)) + '초');
    // }, [1000]);

    call.onEstablished = (call) => {
      console.log('callee onEstablished', call);
    };

    call.onConnected = (call) => {
      console.log('callee onConnected', call);
      setLocalCallee(call._caller.nickname);
    };

    call.onEnded = (call) => {
      console.log('callee onEnded', call);
      // clearInterval(time);
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
  }, []);

  useEffect(() => {
    if (loginDone) {
      SendBirdCall.addListener(callee, {
        onRinging: (call) => {
          console.log('@ onRinging call: ', call);
          acceptCall(call);
        },
        // onAudioInputDeviceChanged: (call) => {
        //   console.log('@ onAudioInputDeviceChanged call: ', call);
        // },
        // onAudioOutputDeviceChanged: (call) => {
        //   console.log('@ onAudioOutputDeviceChanged call: ', call);
        // },
        // onVideoInputDeviceChanged: (call) => {
        //   console.log('@ onVideoInputDeviceChanged call: ', call);
        // },
      });

      return () => {
        SendBirdCall.removeListener(callee, {
          onRinging: (call) => {
            acceptCall(call);
          },
        });
      };
    }
  }, [loginDone, callee, acceptCall]);

  return (
    <div>
      <h1>Custom direct call</h1>

      {loginDone ? (
        <>
          <div
            style={{
              border: '1px solid black',
              padding: '1%',
              margin: '0 auto',
              textAlign: 'center',
              width: '60%',
              maxWidth: '300px',
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
              <span>본인: {caller}</span>
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
              <span>상대방: {callee || localCallee}</span>
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
