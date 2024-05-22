import { Link } from 'react-router-dom'
import Logo from '../../assets/images/HireKey.jpg'
import '../../index.css'
import './home.css'

const Home = () => {

    return (
        <div className='container login-container'>
            <div className="intro-box">
                <img src={Logo} alt="logo" />
                <h1>HireKey</h1>
                <p>Where Employers Post jobs, find workers, hire workers, get work done in any Industry faster</p>
            </div>
            <div className="login-box">
                <h1>Continue As</h1>
                <Link to='/register' className='contractor'>
                    <h1>Contractor &#8594;</h1>
                    <small>Post jobs, find workers, hire workers, get work done in any Industry</small>
                </Link>
                <Link to='/jobboard/ongoing' className='worker'>
                    <h1>Worker &#8594;</h1>
                    <small>Find jobs, apply on jobs, get hired, do work and get fair paid</small>
                </Link>
                <Link to='/jobboard/ongoing' className='worker'>
                    <h1>Visitor &#8594;</h1>
                    {/* <small>Find jobs, apply on jobs, get hired, do work and get fair paid</small> */}
                </Link>
            </div>
        </div>
    )
}

export default Home