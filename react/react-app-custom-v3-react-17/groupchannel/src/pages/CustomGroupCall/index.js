import React, { useCallback, useEffect, useState } from 'react';
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

  useEffect(() => {
    console.log('roomCtx', roomCtx);
  }, [roomCtx]);

  useEffect(() => {
    console.log('roomId', roomId);
  }, [roomId]);

  const createRoom = useCallback(() => {
    const roomParams = {
      roomType: SendBirdCall.RoomType.LARGE_ROOM_FOR_AUDIO_ONLY,
    };

    SendBirdCall.createRoom(roomParams)
      .then((room) => {
        console.log('room created', room);
        setRoomCtx(room);
        setRoomDone(true);
      })
      .catch((e) => {
        console.log('Failed to create room', e);
      })
      .finally(() => {
        console.log('Room processing complete');
      });
  }, []);

  // ca7ee077-9b8f-4424-9a38-4d55c2057368

  const enterRoom = useCallback(() => {
    SendBirdCall.fetchRoomById(roomId)
      .then((room) => {
        console.log('fetch room successfully', room);
        setRoomCtx(room);

        const enterParams = { audioEnalbed: true };

        room
          .enter(enterParams)
          .then(() => {
            console.log('User has successfully joined');
            setRoomDone(true);
          })
          .catch((error) => {
            console.log('failed to join room', error);
          });

        // 와 같은 감지 기능이 있어야 할 듯
        room.on('remoteParticipantEntered', (participant) => {
          // Called when a remote participant has entered the room.
          console.log('participant entered', participant);
        });

        room.on('remoteParticipantExited', (participant) => {
          // Called when a remote participant has exited the room.
          console.log('participant exited', participant);
        });
      })
      .catch((error) => {
        console.log('error fetching room', error);
      });
  }, [roomId]);

  const exitRoom = useCallback(() => {
    SendBirdCall.fetchRoomById(roomId)
      .then((room) => {
        room.exit();
        setRoomDone(false);
        console.log('Room exited');
      })
      .catch((error) => {
        console.log('error exit room', error);
      });
  }, [roomId]);

  return (
    <div>
      <h1>Custom Group Call</h1>

      <span>
        your room: {roomCtx?.roomId || 'ca7ee077-9b8f-4424-9a38-4d55c2057368'}
      </span>

      {loginDone ? (
        <>
          <h1>hello, {caller}</h1>

          <RoomControllerView
            createRoom={createRoom}
            enterRoom={enterRoom}
            roomId={roomId}
            setRoomId={setRoomId}
          />

          {roomDone && <GroupCallView roomCtx={roomCtx} exitRoom={exitRoom} />}
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
