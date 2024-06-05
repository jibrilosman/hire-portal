import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../../assets/images/HireKey.jpg";
import "./nav.css";
import "../../index.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineLogout } from "react-icons/ai";
import axios from "axios";

const Nav = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const auth = localStorage.getItem("token");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState(""); //[1]
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const token = localStorage.getItem("token");
  //     console.log(token);
  //     try {
  //       const { data } = await axios.get("contractors/profile", {
  //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //       });
  //       setUserName(data.name);
  //       setRole(data.role); //[2]
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchUserData();
  // }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "/contractors/logout",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <nav className={showMenu ? "mobile-menu" : "mobile-menu-icon"}>
        <Link to="/" className="logo">
          <img src={Logo} alt="logo" />
        </Link>
        {role === "contractor" ? (
          <NavLink to={`/dashboard/${id}`}>Dashboard</NavLink>
        ) : (
          ""
        )}

        {role === "worker" ? (
          <NavLink to={`/job-dashboard/${id}`}>Job board</NavLink>
        ) : (
          <NavLink to={`/visit-dashboard`}>Job board</NavLink>
        )}

        {auth ? (
          <NavLink to="#" onClick={handleLogout}>
            <AiOutlineLogout />
          </NavLink>
        ) : (
          <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/">Login</NavLink>
          </>
        )}
      </nav>
      <Link to="#" onClick={toggleMenu}>
        <RxHamburgerMenu className="icon" />
      </Link>
    </>
  );
};

export default Nav;
