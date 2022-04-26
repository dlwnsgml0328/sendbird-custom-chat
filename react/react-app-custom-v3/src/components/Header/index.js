import { Link } from 'react-router-dom';
import { HeaderWrap } from './style';

const Header = () => {
  return (
    <HeaderWrap>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/quickStart">quick start</Link>
      </li>
      <li>
        <Link to="/dateLocale">date locale</Link>
      </li>
    </HeaderWrap>
  );
};

export default Header;
