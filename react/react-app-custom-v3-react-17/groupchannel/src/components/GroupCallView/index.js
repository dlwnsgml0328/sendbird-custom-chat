import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const GroupCallView = ({
  roomId,
  setRoomDone,
  SendBirdCall,
  roomCtx,
  caller,
  moderator,
}) => {
  const [mute, setMute] = useState(false);

  useEffect(() => {
    console.log('caller: ', caller);
  }, [caller]);

  useEffect(() => {
    if (caller === moderator) {
      console.log('you are a moderator', roomCtx);
    }
  }, [caller, moderator, roomCtx]);

  const mediaViewRef = useCallback(
    (node) => {
      SendBirdCall.fetchRoomById(roomId)
        .then((room) => {
          room.participants.forEach((p) => {
            p.setMediaView(node);
          });
          // room.setAudioForLargeRoom(node);
        })
        .catch((err) => {
          console.error('error occured in fetchRoomById', err);
        });
    },
    [SendBirdCall, roomId],
  );

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
  }, [SendBirdCall, setRoomDone, roomId]);

  const muteHandler = useCallback(
    (mute = false) => {
      SendBirdCall.fetchRoomById(roomId).then((room) => {
        if (!mute) {
          console.log(
            'muteMicrophone():',
            room.localParticipant.muteMicrophone(),
          );
          room.localParticipant.muteMicrophone();
          setMute(true);
        } else {
          console.log(
            'un muteMicrophone():',
            room.localParticipant.unmuteMicrophone(),
          );
          room.localParticipant.unmuteMicrophone();
          setMute(false);
        }
      });
    },
    [SendBirdCall, roomId],
  );

  return (
    <Overlay>
      <div>
        <span className="exit" onClick={() => exitRoom()}>
          X
        </span>
      </div>
      <h1>Group Call View !</h1>

      <div className="person_list_wrap">
        {roomCtx?.participants.map((person) => (
          <div className="person" key={person.participantId}>
            <div className="person_info">
              <div>
                {moderator === person.user.userId && (
                  <span>
                    <b>Moderator </b>
                  </span>
                )}
                <span>
                  {caller === person.user.userId ? '본인: ' : '참여자: '}
                </span>
                <span>{person.user.userId}</span>
              </div>
              <div className="audio_main">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 114.3 60.7"
                >
                  <path d="M113.05,59.18l-2-.41c-42.82-8.89-65-8.89-107.82,0l-2,.41v-51l1.32-.27C45.42-1,68.89-1,111.74,7.92l1.31.27Z" />
                </svg>

                {caller === person.user.userId ? (
                  <div>
                    {!mute ? (
                      <button type="button" onClick={() => muteHandler(mute)}>
                        <span role="img" aria-label="mute">
                          Mute 📴
                        </span>
                      </button>
                    ) : (
                      <button type="button" onClick={() => muteHandler(mute)}>
                        <span role="img" aria-label="un_mute">
                          un Mute 📳
                        </span>
                      </button>
                    )}
                  </div>
                ) : null}

                {moderator === caller ? (
                  <ModeratorMode
                    person={person}
                    caller={caller}
                    SendBirdCall={SendBirdCall}
                    roomId={roomId}
                  />
                ) : null}

                {/* 오디오 관련 라이브러리  */}
                <audio
                  ref={mediaViewRef}
                  autoPlay
                  controls
                  muted={caller === person.user.userId}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="btn_group">
        <button type="button" onClick={() => exitRoom()}>
          통화 종료
        </button>
      </div>
    </Overlay>
  );
};

export default GroupCallView;

const ModeratorMode = ({ person, caller, SendBirdCall, roomId }) => {
  // mute this player
  const muteSomeone = (person) => {
    SendBirdCall.fetchRoomById(roomId)
      .then((room) => {
        console.log('@ mute for room room', room, person);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      {caller !== person.user.userId ? (
        <div>
          <button type="button" onClick={() => muteSomeone(person)}>
            <span role="img" aria-label="mute">
              Mute this player 📴
            </span>
          </button>
        </div>
      ) : null}
    </>
  );
};

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: #6211c8;
  color: #fff;

  audio {
    width: 100%;
    margin-top: 40px;
  }

  button {
    border: 2px solid #fff;
    background: #6211c8;
    color: #fff;
    text-align: center;

    cursor: pointer;
  }

  video {
    background-color: #000;
    border: 2px solid #000;
    width: 100%;
  }

  .exit {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }

  .person_list_wrap {
    display: flex;
    flex-wrap: wrap;
  }

  .person {
    margin: 1%;
    border: 2px solid #fff;
    width: 45%;
    height: 40vh;
  }

  .person_info {
    padding: 5%;
    height: 90%;
    text-align: center;

    svg {
      margin-top: 5%;
      max-width: 250px;
      cursor: pointer;
    }

    path {
      stroke: #fff;
      fill: #6211c8;
      transition: 100ms ease-in 100ms;

      :hover {
        fill: #fff;
      }
    }
  }

  .btn_group {
    position: absolute;
    bottom: 7%;
    left: 0%;
    right: 0%;
    text-align: center;
  }

  .audio_main {
    max-height: 274px;
    height: 100%;
  }
`;
