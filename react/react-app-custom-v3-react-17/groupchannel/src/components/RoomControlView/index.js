import React, { useCallback } from 'react';
import styled from 'styled-components';

const RoomControllerView = ({
  SendBirdCall,
  roomId,
  setRoomId,
  setRoomCtx,
  setRoomDone,
  setErrorMsg,
}) => {
  const createRoom = useCallback(() => {
    // const customItem = { key1: 'value1' };
    const roomParams = {
      roomType: SendBirdCall.RoomType.LARGE_ROOM_FOR_AUDIO_ONLY,
      // customItem: customItem,
    };

    SendBirdCall.createRoom(roomParams)
      .then((room) => {
        console.log('room created', room);
        setRoomCtx(room);
        // room.setAudioForLargeRoom(null);
      })
      .catch((e) => {
        console.log('Failed to create room', e);
      })
      .finally(() => {
        console.log('Room processing complete');
      });
  }, [SendBirdCall, setRoomCtx]);

  const enterRoom = useCallback(() => {
    SendBirdCall.fetchRoomById(roomId)
      .then((room) => {
        console.log('fetch room successfully', room, room.participants);
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

        room.on('customItemsUpdated', (customItems, affectedKeys) => {
          // console.log('# customItemsUpdated');
          // console.log('# customItems: ', customItems);
          // console.log('# affectedKeys: ', affectedKeys);
          SendBirdCall.fetchRoomById(roomId)
            .then((room) => {
              console.log('customItemsUpdated room', room);
              setRoomCtx({
                ...room,
                participants: room.participants,
                remoteParticipants: room.remoteParticipants,
                localParticipants: room.localParticipants,
              });
            })
            .catch((err) => {
              console.log('error in customItemsUpdated room', err);
            });
        });

        room.on('remoteParticipantEntered', (participant) => {
          console.log('@ participant entered', participant);

          SendBirdCall.fetchRoomById(roomId)
            .then((room) => {
              setRoomCtx({
                ...room,
                participants: room.participants,
                remoteParticipants: room.remoteParticipants,
                localParticipants: room.localParticipants,
              });
            })
            .catch((error) => {
              console.log('error', error);
            });
        });

        room.on('remoteParticipantExited', (participant) => {
          console.log('@ participant exited', participant);

          SendBirdCall.fetchRoomById(roomId).then((room) => {
            setRoomCtx({
              ...room,
              participants: room.participants,
              remoteParticipants: room.remoteParticipants,
              localParticipants: room.localParticipants,
            });
            console.log('@ room updated by exit: ', room);
          });
        });

        room.on('remoteParticipantStreamStarted', (participant) => {
          console.log('@ participant stream started', participant);
          SendBirdCall.fetchRoomById(roomId).then((room) => {
            setRoomCtx(room);
            console.log('@ room updated by stream: ', room);
          });
        });

        room.on('remoteAudioSettingsChanged', (participant) => {
          console.log('@ participant audio setting changed', participant);
          SendBirdCall.fetchRoomById(roomId).then((room) => {
            setRoomCtx(room);
            console.log('@ room updated by audio setting: ', room);
          });
        });
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  }, [SendBirdCall, setRoomDone, roomId, setRoomCtx, setErrorMsg]);

  return (
    <RoomController>
      <div className="room_container">
        <div>
          <span>방 만들기</span>
        </div>
        <button type="button" onClick={() => createRoom()}>
          방 만들기
        </button>
      </div>
      <div className="room_container">
        <div>
          <span>방 입장하기</span>
        </div>
        <div>
          <input
            type="search"
            placeholder="들어갈 방의 ID를 입력하세요"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </div>
        <div>
          <button type="button" onClick={() => enterRoom()}>
            입장하기
          </button>
        </div>
      </div>
    </RoomController>
  );
};

export default RoomControllerView;

const RoomController = styled.div`
  display: flex;
  height: 35vh;
  align-items: center;
  justify-content: center;
  margin-top: 5%;

  .room_container {
    border: 1px solid #000;
    height: 100%;
    margin: 32px;
    text-align: center;
    width: 100%;
    max-width: 400px;
    min-width: 200px;
    background-color: #6211c8;
    color: #fff;
    font-weight: 400;

    input {
      width: 180px;
    }

    div {
      margin: 3% 0;
    }

    button {
      border: 2px solid #fff;
      border-radius: 15px;
      background-color: inherit;
      color: #fff;
      padding: 8px;
      cursor: pointer;

      transition: all 0.3s ease;

      :hover {
        background-color: #fff;
        color: #6211c8;
      }
    }
  }

  @media screen and (max-width: 480px) {
    flex-wrap: wrap;
    font-size: 4vw;
    margin-top: 0;

    .room_container {
      width: 100%;
      height: 80%;
    }

    input {
      width: 300px;
    }
  }
`;
