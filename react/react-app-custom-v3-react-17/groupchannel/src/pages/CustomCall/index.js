import React, { useCallback, useEffect, useState } from 'react';
import SendBirdCall from 'sendbird-calls';
import { APP_ID, NICKNAME, USER_ID } from '../../config/const';

const CustomCall = () => {
  const [done, setDone] = useState(false);
  const [roomState, setRoomState] = useState(false);
  const [room, setRoom] = useState();

  const authOption = { userId: USER_ID, accessToken: NICKNAME };
  const roomParams = {
    roomType: SendBirdCall.RoomType.LARGE_ROOM_FOR_AUDIO_ONLY,
  };

  const connectCall = useCallback(() => {
    if (authOption && roomParams && !done) {
      SendBirdCall.init(APP_ID);
      setDone(true);

      // 유저 정보 확인
      SendBirdCall.authenticate(authOption, (result, error) => {
        if (error) {
          console.log('error authenticating');
        } else {
          console.log('success authenticating');
        }
      })
        // 웹 소켓 연결
        .then(() => {
          SendBirdCall.connectWebSocket()
            .then(() => {
              console.log('Succeeded to connect');
            })
            .catch((e) => {
              console.log('Failed to connect', e);
            });
        })
        // 방 만들기
        .then(() => {
          SendBirdCall.createRoom(roomParams)
            .then((room) => {
              console.log('room created', room);
              setRoom({
                moderator: room.createdBy,
                roomId: room.roomId,
                roomType: room.roomType,
                state: room.state,
                _ctx: room._ctx,
              });
              setRoomState(true);
            })
            .catch((e) => {
              console.log('Failed to create room', e);
            })
            .finally(() => {
              console.log('Room processing complete');
            });
        });
    }
  }, [authOption, roomParams, done]);

  const disconnectCall = useCallback(() => {
    if (roomState) {
      SendBirdCall.fetchRoomById(room.roomId)
        .then((room) => {
          room.exit();
          setRoomState(false);
        })
        .catch((e) => console.log('Failed to disconnect', e));
    } else {
      console.log('check the roomState');
      return;
    }
  }, [roomState, room]);

  useEffect(() => {
    if (roomState) {
      console.log('room', room);

      SendBirdCall.fetchRoomById(room.roomId)
        .then((room) => {
          console.log('fetch room success', room);

          // enter 메서드를 사용하기 위해 꼭 필요한 부분
          const enterParams = {
            audioEnabled: true,
          };

          room
            .enter(enterParams)
            .then(() => {
              console.log('User has successfully enter room');
            })
            .catch((e) => {
              console.log('Failed to enter room', e);
            });
        })
        .catch((e) => {
          console.log('fetch room error', e);
        });
    }
  }, [roomState, room]);

  return (
    <div>
      <h1>Custom Call</h1>

      <div>
        <button type="button" onClick={connectCall}>
          connect call
        </button>

        <button type="button" onClick={disconnectCall}>
          disconnect call
        </button>
      </div>

      <div style={{ marginTop: '1%' }}>
        {roomState ? (
          <span role="img" aria-label="connect" style={{ fontSize: '3rem' }}>
            🎧
          </span>
        ) : (
          <span role="img" aria-label="disconnect" style={{ fontSize: '3rem' }}>
            ❌
          </span>
        )}
      </div>
    </div>
  );
};

export default CustomCall;
