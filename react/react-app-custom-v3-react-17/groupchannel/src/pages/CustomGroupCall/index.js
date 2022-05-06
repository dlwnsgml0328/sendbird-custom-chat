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

  const [moderatedPlayers, setModeratedPlayers] = useState([]);

  useEffect(() => {
    if (roomCtx) {
      console.log('@ roomCtx is updated', roomCtx);
      setModerator(roomCtx.createdBy);
      if (roomCtx?.customItems?.key2) {
        setModeratedPlayers(JSON.parse(roomCtx?.customItems?.key2));
      }
    }
  }, [roomCtx]);

  useEffect(() => {
    if (moderatedPlayers.length > 0) {
      console.log('moderatedPlayers: ', moderatedPlayers);
    }
  }, [moderatedPlayers]);

  return (
    <div>
      <h1>Custom Group Call</h1>

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
              moderatedPlayers={moderatedPlayers}
              setModeratedPlayers={setModeratedPlayers}
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
