import React, { useCallback } from 'react';
import styled from 'styled-components';
import { APP_ID } from '../../config/const';

const LoginForm = ({ caller, setCaller, setLoginDone, SendBirdCall }) => {
  const sendBirdAuth = useCallback(() => {
    SendBirdCall.init(APP_ID);

    SendBirdCall.authenticate({ userId: caller }, (result, error) => {
      if (error) {
        console.log('error authenticating', error);
      } else {
        console.log('success authenticating', result);
      }
    }).then(() => {
      SendBirdCall.connectWebSocket()
        .then(() => {
          console.log('connectWebSocket success');
          setLoginDone(true);
        })
        .catch((error) => console.log('connectWebSocket error', error));
    });
  }, [caller, SendBirdCall, setLoginDone]);

  const onSubmit = useCallback(
    (e) => {
      if (SendBirdCall) {
        e.preventDefault();
        sendBirdAuth();
      } else {
        console.log('doesnt exist');
      }
    },
    [SendBirdCall, sendBirdAuth],
  );

  return (
    <CustomForm onSubmit={onSubmit}>
      <div>
        <span>name:</span>
        <input
          type="text"
          value={caller}
          placeholder="write yout name"
          onChange={(e) => setCaller(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </CustomForm>
  );
};

export default LoginForm;

const CustomForm = styled.form`
  padding: 1%;
  border: 1px solid black;
  width: 30%;
  margin: 0 auto;

  div {
    text-align: center;
  }

  span {
    margin-right: 5%;
  }

  button {
    margin-top: 5%;
    text-align: center;
  }
`;
