import { Outlet, NavLink } from "react-router-dom";
import Nav from "../../components/header/Nav";
import "./jobboard.css";
import "../../index.css";
import "./jobboard.css";

const JobDashboard = () => {
  return (
    <>
      <Nav />
      <div className="job-main-container">
        <NavLink className="link" to=".">
          All
        </NavLink>
        <NavLink className="link" to="ongoing">
          Ongoing
        </NavLink>
        <NavLink className="link" to="upcoming">
          Upcoming
        </NavLink>
        <NavLink className="link" to="completed">
          Completed
        </NavLink>
      </div>
      <div className="content"></div>
      <Outlet />
    </>
  );
};

export default JobDashboard;
