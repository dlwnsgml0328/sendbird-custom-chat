import React, { useEffect, useState } from 'react';
import SendBirdCall from 'sendbird-calls';

import LoginForm from '../../components/LoginForm';
import GroupCallView from '../../components/GroupCallView';
import RoomControllerView from '../../components/RoomControlView';

import styled from 'styled-components';

const CustomGroupCall = () => {
  const [caller, setCaller] = useState('');
  const [loginDone, setLoginDone] = useState(false);

  const [roomId, setRoomId] = useState('');

  const [roomCtx, setRoomCtx] = useState();
  const [roomDone, setRoomDone] = useState(false);

  const [moderator, setModerator] = useState('');

  const [moderatedPlayers, setModeratedPlayers] = useState([]);

  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (errorMsg.length > 0) {
      setTimeout(() => {
        setErrorMsg('');
      }, [3000]);
    }
  }, [errorMsg]);

  useEffect(() => {
    if (roomCtx) {
      console.log('@ roomCtx is updated', roomCtx);
      setModerator(roomCtx.createdBy);
      if (roomCtx?.customItems?.key2) {
        setModeratedPlayers(JSON.parse(roomCtx?.customItems?.key2));
      }
    }
  }, [roomCtx]);

  return (
    <CustomCallWrapper done={roomDone}>
      {loginDone ? (
        <>
          <h3>hello, {caller}</h3>

          <h3 className="roomName">
            your room:{' '}
            {roomCtx?.roomId || 'ca7ee077-9b8f-4424-9a38-4d55c2057368'}
          </h3>

          <h3>{errorMsg.length > 1 ? errorMsg : null}</h3>
        </>
      ) : (
        <h3>Custom Group Call</h3>
      )}

      {loginDone ? (
        <>
          {roomDone ? (
            <GroupCallView
              roomId={roomId}
              setRoomDone={setRoomDone}
              SendBirdCall={SendBirdCall}
              roomCtx={roomCtx}
              caller={caller}
              moderator={moderator}
              moderatedPlayers={moderatedPlayers}
              setModeratedPlayers={setModeratedPlayers}
            />
          ) : (
            <RoomControllerView
              SendBirdCall={SendBirdCall}
              roomId={roomId}
              setRoomId={setRoomId}
              setRoomCtx={setRoomCtx}
              setRoomDone={setRoomDone}
              setErrorMsg={setErrorMsg}
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
    </CustomCallWrapper>
  );
};
const CustomCallWrapper = styled.div`
  height: 100%;

  overflow-y: ${(props) => (props.done ? 'hidden' : 'scroll')};

  h3 {
    margin: 0 1%;
    margin-top: 1%;
  }
`;

CustomGroupCall.defaultProps = {
  roomDone: false,
};

export default CustomGroupCall;
