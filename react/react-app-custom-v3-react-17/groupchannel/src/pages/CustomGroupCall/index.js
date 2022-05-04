import React, { useEffect, useState } from 'react';
import SendBirdCall from 'sendbird-calls';

import LoginForm from '../../components/LoginForm';
import GroupCallView from '../../components/GroupCallView';
import RoomControllerView from '../../components/RoomControlView';

const CustomGroupCall = () => {
  const [caller, setCaller] = useState('');
  const [loginDone, setLoginDone] = useState(false);

  const [roomId, setRoomId] = useState('');

  const [roomCtx, setRoomCtx] = useState();
  const [roomDone, setRoomDone] = useState(false);

  const [moderator, setModerator] = useState('');

  useEffect(() => {
    if (roomCtx) {
      console.log('@ roomCtx', roomCtx);
      setModerator(roomCtx.createdBy);
    } else {
      console.log('no CTX');
    }
  }, [roomCtx]);

  // ca7ee077-9b8f-4424-9a38-4d55c2057368

  return (
    <div>
      <h1>Custom Group Call</h1>

      <span className="roomName">
        your room: {roomCtx?.roomId || 'ca7ee077-9b8f-4424-9a38-4d55c2057368'}
      </span>

      {loginDone ? (
        <>
          <h1>hello, {caller}</h1>

          <RoomControllerView
            SendBirdCall={SendBirdCall}
            roomId={roomId}
            setRoomId={setRoomId}
            setRoomCtx={setRoomCtx}
            setRoomDone={setRoomDone}
          />

          {roomDone && (
            <GroupCallView
              roomId={roomId}
              setRoomDone={setRoomDone}
              SendBirdCall={SendBirdCall}
              roomCtx={roomCtx}
              caller={caller}
              moderator={moderator}
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

export default CustomGroupCall;
