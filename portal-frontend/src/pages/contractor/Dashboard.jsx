import { NavLink, Outlet } from 'react-router-dom'
import './dashboard.css'
import '../../index.css'
import '../../components/header/nav.css'
import Nav from '../../components/header/Nav';
// import 'bootstrap/dist/css/bootstrap.min.css';


const Dashboard = () => {
   
  return (
    <>
    <Nav />
    <div  className='dash-container'>
      <NavLink className="link"  to=".">
        Dashboard Home
      </NavLink>
      <NavLink className="link" to="link2">
        link 2
      </NavLink>
      <NavLink className="link" to="link3">
        link 3
      </NavLink>
    </div>
    <div className="content"></div>
    <Outlet />
    </>
    
    
  );
}

export default Dashboard