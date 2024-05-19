import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/HireKey.jpg";
import "./nav.css";
import "../../index.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineLogout } from "react-icons/ai";
import axios from "axios";
import { UserContext } from "../../context/userContext";

const Nav = () => {
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const auth = localStorage.getItem('token');
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

 
  


  return (
    <>
      <nav className={showMenu ? 'mobile-menu' : 'mobile-menu-icon'}>
        <Link to="/" className="logo">
          <img src={Logo} alt="logo" />
        </Link>
       
          <NavLink to="/">Home</NavLink>
        
        
          <NavLink to="/dashboard">Dashboard</NavLink>
        
       
            <NavLink to="/jobboard">Job Board</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/login" onClick={handleLogout}>
              <AiOutlineLogout />
            </NavLink>
       
        
          <NavLink to="/login">Login</NavLink>
    
      </nav>
      <Link
        to={({ isActive }) => (isActive ? "active" : "")}
        onClick={toggleMenu}
      >
        {<RxHamburgerMenu className="icon" />}
      </Link>
    </>
    
  );
};

export default Nav;
