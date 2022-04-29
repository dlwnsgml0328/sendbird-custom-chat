import React, { useEffect, useState } from 'react';
import SendBirdCall from 'sendbird-calls';

import LoginForm from '../../components/LoginForm';
import DialView from '../../components/DialView';
import CallView from '../../components/CallView';
import RingingView from '../../components/RingingView';

const CustomDirectCall2 = () => {
  const [caller, setCaller] = useState('');
  const [callee, setCallee] = useState('');

  const [loginDone, setLoginDone] = useState(false);

  const [isCall, setIsCall] = useState(false);

  const [callCtx, setCallCtx] = useState();
  const [calleeCtx, setCalleeCtx] = useState();

  const [ringing, setRinging] = useState(false);

  const [callerTime, setCallerTime] = useState(0);
  const [calleeTime, setCalleeTime] = useState(0);

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
      <h1>Custom Direct Call V2</h1>

      {loginDone ? (
        <>
          <DialView
            SendBirdCall={SendBirdCall}
            callee={callee}
            setCallee={setCallee}
            setIsCall={setIsCall}
            setCallCtx={setCallCtx}
            setCallerTime={setCallerTime}
          />
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

export default CustomDirectCall2;
