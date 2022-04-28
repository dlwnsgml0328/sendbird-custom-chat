import React, { useCallback } from 'react';
import styled from 'styled-components';

const CallView = ({ callCtx, calleeCtx, setIsCall }) => {
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
        {callCtx?._isVideoCall ? (
          <div className="video_wrap">
            <div>
              <span>영상 통화</span>
            </div>
            <div>
              <button onClick={() => closeOverlay()}>통화 종료</button>
            </div>
          </div>
        ) : (
          <div className="video_wrap">
            <div>
              <span>음성 통화</span>
            </div>
            <div>
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
`;
