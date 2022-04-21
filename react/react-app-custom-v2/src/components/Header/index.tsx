import { Link } from "react-router-dom";
import { HeaderWrap } from "./style";

const Header = () => {
  return (
    <HeaderWrap>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/chat">Chat</Link>
      </li>
      <li>
        <Link to="/channel">Channel</Link>
      </li>
    </HeaderWrap>
  );
};

export default Header;
