import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import ChatInCall from '../ChatInCall';

const GroupCallView = ({
  roomId,
  setRoomDone,
  SendBirdCall,
  roomCtx,
  caller,
  moderator,
  isVideo,
}) => {
  const [mute, setMute] = useState(false);
  const [offVideo, setOffVideo] = useState(false);

  const [controlPlayers, setControlPlayers] = useState([]);

  const [isChat, setIsChat] = useState(false);
  const [info, setInfo] = useState();

  useEffect(() => {
    if (info) {
      SendBirdCall.fetchRoomById(roomId)
        .then((room) => {
          const customItem = { key3: `${info.url}` };
          room
            .updateCustomItems(customItem)
            .then((res) => {
              console.log('update CustomItems', res);
            })
            .catch((err) => {
              console.log('error in update CustomItems', err);
            });
        })
        .catch((err) => {
          console.log('fetchRoomById error', err);
        });
    }
  }, [info, SendBirdCall, roomId]);

  useEffect(() => {
    if (controlPlayers.length > 0) {
      SendBirdCall.fetchRoomById(roomId)
        .then((room) => {
          const customItem = { key2: JSON.stringify(controlPlayers) };
          room
            .updateCustomItems(customItem)
            .then((res) => {
              console.log('update CustomItems', res);
            })
            .catch((err) => {
              console.log('error in update CustomItems', err);
            });
        })
        .catch((err) => {
          console.log('fetchRoomById error', err);
        });
    }
  }, [controlPlayers, SendBirdCall, roomId]);

  const mediaViewRef = useCallback(
    (node) => {
      if (!isVideo) {
        SendBirdCall.fetchRoomById(roomId)
          .then((room) => {
            room.setAudioForLargeRoom(node);
          })
          .catch((err) => {
            console.error('error occured in fetchRoomById', err);
          });
      } else {
        console.log('is Video and ready to play mediaview');
        SendBirdCall.fetchRoomById(roomId)
          .then((room) => {
            room.participants.forEach((p) => {
              if (p.user.userId === caller) {
                room.localParticipant.setLocalMediaView(node);
              }
            });
          })
          .catch((err) => {
            console.error('error occured in setMediaView', err);
          });
      }
    },
    [SendBirdCall, roomId, isVideo, caller],
  );

  const exitRoom = useCallback(() => {
    SendBirdCall.fetchRoomById(roomId)
      .then((room) => {
        room.exit();
        setRoomDone(false);
        console.log('exit the room');
      })
      .catch((error) => {
        console.log('error exit room', error);
      });
  }, [SendBirdCall, setRoomDone, roomId]);

  const muteHandler = useCallback(
    (mute = false) => {
      SendBirdCall.fetchRoomById(roomId).then((room) => {
        if (!mute) {
          console.log('muteMicrophone()');
          room.localParticipant.muteMicrophone();
          setMute(true);
        } else {
          console.log('un muteMicrophone');
          room.localParticipant.unmuteMicrophone();
          setMute(false);
        }
      });
    },
    [SendBirdCall, roomId],
  );

  const videoHandler = useCallback(
    (video = false) => {
      SendBirdCall.fetchRoomById(roomId)
        .then((room) => {
          if (!video) {
            console.log('Off Video()');
            room.localParticipant.stopVideo();
            setOffVideo(true);
          } else {
            console.log('On Video()');
            room.localParticipant.startVideo();
            setOffVideo(false);
          }
        })
        .catch((error) => {
          console.error(error);
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
      <h3>Group Call View !</h3>

      <div className="person_list_wrap">
        {roomCtx?.participants.map((person) => (
          <div className="person" key={person.participantId}>
            <div className="person_info">
              <div>
                {moderator === person.user.userId && (
                  <span>
                    <b>Moderator - </b>
                  </span>
                )}
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
                    {isVideo && (
                      <>
                        {!offVideo ? (
                          <button
                            type="button"
                            onClick={() => videoHandler(offVideo)}
                          >
                            <span role="img" aria-label="mute">
                              Video Off
                            </span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => videoHandler(offVideo)}
                          >
                            <span role="img" aria-label="mute">
                              Video On
                            </span>
                          </button>
                        )}
                      </>
                    )}
                  </div>
                ) : null}

                {moderator === caller && (
                  <ModeratorMode
                    person={person}
                    caller={caller}
                    controlPlayers={controlPlayers}
                    setControlPlayers={setControlPlayers}
                  />
                )}

                {isVideo ? (
                  <>
                    {caller ? (
                      <video
                        ref={(node) => {
                          if (!node) {
                            return;
                          } else {
                            if (caller === person.user.userId)
                              mediaViewRef(node);
                          }
                        }}
                        playsInline
                        autoPlay
                        id={
                          caller === person.user.userId
                            ? 'local_video_element_id'
                            : 'remote_video_element_id'
                        }
                        muted={caller === person.user.userId}
                      />
                    ) : null}
                  </>
                ) : (
                  <audio
                    ref={(node) => {
                      if (!node) {
                        return;
                      } else {
                        mediaViewRef(node);
                      }
                    }}
                    autoPlay
                    muted={caller === person.user.userId}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="btn_group">
        <button type="button" onClick={() => exitRoom()}>
          통화 종료
        </button>

        <button type="button" onClick={() => setIsChat((prev) => !prev)}>
          채팅방 열기
        </button>
      </div>

      {isChat && (
        <ChatInCall
          caller={caller}
          roomId={roomId}
          info={info}
          setIsChat={setIsChat}
          setInfo={setInfo}
          roomCtx={roomCtx}
        />
      )}
    </Overlay>
  );
};

export default GroupCallView;

const ModeratorMode = ({
  person,
  caller,
  controlPlayers,
  setControlPlayers,
}) => {
  // give controls to this player
  const controlPlayer = useCallback(
    (person) => {
      if (controlPlayers.some((p) => p === person.user.userId)) {
        console.log('같은 인물을 추가 할 수 없습니다.');
        return;
      } else {
        setControlPlayers((prev) => [...prev, person.user.userId]);
      }
    },
    [controlPlayers, setControlPlayers],
  );

  return (
    <>
      {caller !== person.user.userId ? (
        <div>
          <button type="button" onClick={() => controlPlayer(person)}>
            <span role="img" aria-label="mute">
              give controll to this player 📴
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

  h3 {
    margin-left: 1%;
  }

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
    height: 100%;
    max-height: 184px;
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
    max-width: 400px;
  }

  .person_info {
    padding: 5%;
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

    button {
      margin-right: 5%;
    }
  }

  .audio_main {
    max-height: 274px;
    height: 100%;
  }

  @media screen and (max-width: 480px) {
    .person_list_wrap {
      margin-top: 5%;
    }
  }
`;
