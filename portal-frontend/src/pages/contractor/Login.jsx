import "../../index.css";
import Logo from "../../assets/images/HireKey.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      await axios.post("/contractors/login", {
        email,
        password,
      }, { withCredentials: true })
      .then(response => {
        setData(response.data);
        navigate("/contractors/dashboard");
      }
      )
    }
    catch (error) {
      if (error.response) {
        setErrors(error.response.data);
      }
    }  
  };

  return (
    <div className="container login-container">
      <div className="intro-box">
        <img src={Logo} alt="logo" />
        <h1>HireKey</h1>
        <p>
          Where Employers Post jobs, find workers, hire workers, get work done
          in any Industry faster
        </p>
      </div>
      <div className="login-box">
        <form onSubmit={handleUserLogin}>
          <h1>Login</h1>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
          />
          {errors.email && <small className="error">{errors.email}</small>}
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Password"
          />
          {errors.password && <small className="error">{errors.password}</small>}
          <button type="submit">Login</button>
          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
