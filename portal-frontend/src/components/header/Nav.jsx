import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../../assets/images/HireKey.jpg";
import "./nav.css";
import "../../index.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineLogout } from "react-icons/ai";
import axios from "axios";


const Nav = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const auth = localStorage.getItem("token");
  const [userName, setUserName] = useState("");
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };



  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      console.log(token);
      try {

        const { data } = await axios.get('contractors/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUserName(data.name);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('contractors/logout', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <nav className={showMenu ? 'mobile-menu' : 'mobile-menu-icon'}>
        <Link to="/" className="logo">
          <img src={Logo} alt="logo" />
        </Link>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        {auth ? (
          <NavLink to="#" onClick={handleLogout}>
            <AiOutlineLogout />
          </NavLink>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </nav>
      <Link
        to="#"
        onClick={toggleMenu}
      >
        <RxHamburgerMenu className="icon" />
      </Link>
    </>
  );
};

export default Nav;
