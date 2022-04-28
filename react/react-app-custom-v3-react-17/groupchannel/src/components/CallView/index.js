import React, { useCallback } from 'react';
import styled from 'styled-components';

const CallView = ({ callCtx, calleeCtx, setIsCall }) => {
  const localMediaViewRef = useCallback(
    (node) => {
      if (callCtx) {
        callCtx.setLocalMediaView(node);
      } else if (calleeCtx) {
        calleeCtx.setLocalMediaView(node);
      } else {
        return;
      }
    },
    [callCtx, calleeCtx],
  );

  const remotelMediaViewRef = useCallback(
    (node) => {
      if (callCtx) {
        callCtx.setRemoteMediaView(node);
      } else if (calleeCtx) {
        calleeCtx.setRemoteMediaView(node);
      } else {
        return;
      }
    },
    [callCtx, calleeCtx],
  );

  // 종료하기
  const closeOverlay = useCallback(() => {
    if (callCtx) {
      callCtx.end();
    } else if (calleeCtx) {
      calleeCtx.end();
    } else {
      return;
    }

    setIsCall(false);
  }, [callCtx, calleeCtx, setIsCall]);

  return (
    <Overlay>
      <div className="CallViewWrapper">
        <span className="exit" onClick={() => closeOverlay()}>
          X
        </span>
        <h1>Hello CTX!</h1>
        {callCtx?._isVideoCall || calleeCtx?._isVideoCall ? (
          <div className="video_wrap">
            <div>
              <span>영상 통화</span>
            </div>
            <VideoViewWrapper>
              <div>
                <span>
                  본인:{' '}
                  {callCtx
                    ? callCtx._caller.userId
                    : calleeCtx
                    ? calleeCtx._caller.userId
                    : null}
                </span>
                <video
                  ref={localMediaViewRef}
                  id="local_video_element_id"
                  autoPlay
                  muted={false}
                />
              </div>
              <div>
                <span>
                  상대방:{' '}
                  {callCtx
                    ? callCtx._callee.userId
                    : calleeCtx
                    ? calleeCtx._caller.userId
                    : null}
                </span>
                <video
                  ref={remotelMediaViewRef}
                  id="remote_video_element_id"
                  autoPlay
                  muted={false}
                />
              </div>
            </VideoViewWrapper>
            <div className="btn_group">
              <button onClick={() => closeOverlay()}>통화 종료</button>
            </div>
          </div>
        ) : (
          <div className="video_wrap">
            <div>
              <span>음성 통화</span>
            </div>
            <div className="btn_group">
              <button onClick={() => closeOverlay()}>통화 종료</button>
            </div>
          </div>
        )}
      </div>
    </Overlay>
  );
};

export default CallView;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: #6211c8;
  color: #fff;

  .CallViewWrapper {
    .exit {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
    }
  }

  .btn_group {
    margin-top: 5%;
    text-align: center;
  }
`;

const VideoViewWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 5%;

  div {
    width: 100%;
  }

  video {
    margin-top: 3%;
    border: 1px solid #000;
    width: 95%;
    height: auto;
    display: flex;
  }
`;
