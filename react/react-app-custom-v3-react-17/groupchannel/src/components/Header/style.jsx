import styled from 'styled-components';

export const HeaderWrap = styled.ul`
  padding-left: 0;
  width: 100%;
  display: flex;
  list-style: none;

  li {
    margin-right: 1%;
  }

  a {
    text-decoration: none;
    color: #000;

    :hover {
      font-weight: bold;
    }
  }

  @media screen and (max-width: 1500px) {
    font-size: 1.4vw;
  }
`;
