import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderWrap } from './style';

const Header = () => {
  return (
    <HeaderWrap>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/quick_start">quick start</Link>
      </li>
      <li>
        <Link to="/create_channel">create channel</Link>
      </li>
      <li>
        <Link to="/channel_list">channel list</Link>
      </li>
      <li>
        <Link to="/channel_list_2">channel list2</Link>
      </li>
      <li>
        <Link to="/group_channel">group channel</Link>
      </li>
      <li>
        <Link to="/open_channel">open channel</Link>
      </li>
      <li>
        <Link to="/setting_channel">setting channel</Link>
      </li>
      <li>
        <Link to="/edit_profile">edit profile</Link>
      </li>
      <li>
        <Link to="/group_call">group call</Link>
      </li>
      <li>
        <Link to="/direct_call">direct call</Link>
      </li>
      <li>
        <Link to="/custom_chat_call">custom chat call</Link>
      </li>
    </HeaderWrap>
  );
};

export default Header;