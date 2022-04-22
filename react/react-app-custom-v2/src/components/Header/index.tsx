import { Link } from 'react-router-dom';
import { HeaderWrap } from './style';

const Header = () => {
  return (
    <HeaderWrap>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/sdk">SDK</Link>
      </li>
      <li>
        <Link to="/chat">Chat</Link>
      </li>
      <li>
        <Link to="/channel">Channel</Link>
      </li>
      <li>
        <Link to="/channel_settings">Channel Settings</Link>
      </li>
      <li>
        <Link to="/channel_create">Channel Create</Link>
      </li>
    </HeaderWrap>
  );
};

export default Header;
