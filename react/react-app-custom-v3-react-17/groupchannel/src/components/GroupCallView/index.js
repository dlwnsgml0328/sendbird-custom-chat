import React from 'react';
import styled from 'styled-components';

const GroupCallView = ({ roomCtx, exitRoom }) => {
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
              <span>{person.user.userId}</span>

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 114.3 60.7">
                <path d="M113.05,59.18l-2-.41c-42.82-8.89-65-8.89-107.82,0l-2,.41v-51l1.32-.27C45.42-1,68.89-1,111.74,7.92l1.31.27Z" />
              </svg>
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

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: #6211c8;
  color: #fff;

  button {
    border: 2px solid #fff;
    background: #6211c8;
    color: #fff;
    text-align: center;

    cursor: pointer;
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
    width: 31%;
    height: 40vh;
  }

  .person_info {
    padding: 5%;
    height: 90%;

    svg {
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
`;
