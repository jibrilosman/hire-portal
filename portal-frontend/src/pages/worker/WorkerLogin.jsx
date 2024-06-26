import "../../index.css";
import Logo from "../../assets/images/HireKey.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const WorkerLogin = () => {
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

  // const handleUserLogin = async (e) => {
  //   e.preventDefault();
  //   const { email, password } = data;
  //   try {
  //     const { data: responseData } = await axios.post('workers/login', { email, password });
  //     const { token } = responseData;
  //     localStorage.setItem('token', token);
      
  //   } catch (error) {
  //     setErrors(error.response.data);
  //   }
  // };

 const handleUserLogin = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post('/workers/login', { email, password });
      const { token } = data;
      localStorage.setItem("token", token);
    setData()
    console.log(data)
      navigate(`/job-dashboard/${data.id}`);
    } catch (errors) {
        console.log(errors);
        setErrors(errors.response.data);
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
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Password"
          />

          <button type="submit">Login</button>
          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default WorkerLogin;
