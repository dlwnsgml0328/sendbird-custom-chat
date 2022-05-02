import React from 'react';
import styled from 'styled-components';

const RoomControllerView = ({ createRoom, enterRoom, roomId, setRoomId }) => {
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
            type="text"
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
  height: 40vh;
  align-items: center;

  .room_container {
    border: 1px solid #000;
    flex: 1;
    height: 100%;
    margin: 32px;
    text-align: center;

    input {
      width: 240px;
    }

    div {
      margin: 3% 0;
    }
  }
`;
