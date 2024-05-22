import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/images/HireKey.jpg'
import axios from 'axios'

const Register = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1)
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        companyName: '',
        companyAddress: '',
        companyPhone: '',
        companyInterests: ''
    });

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    }

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    }

    const handleInterestClick = (interest) => {
        // Check if the interest is already selected
        const isInterestSelected = formData.companyInterests.includes(interest)
        if (isInterestSelected) {
            // Remove the interest from
            const updatedInterests = formData.companyInterests.filter((i) => i !== interest);
            setFormData({ ...formData, companyInterests: updatedInterests });
        } else {
            // Add the interest to the list
            const updatedInterests = [...formData.companyInterests, interest];
            setFormData({ ...formData, companyInterests: updatedInterests });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('contractors/register', formData);
            alert('Account created successfully');
            navigate('/login');
        } catch (error) {
            setErrors(error.response.data);
        }
    }

    return (
        <div className='container login-container'>
            <div className="intro-box">
                <img src={Logo} alt="logo" />
                <h1>HireKey</h1>
                <p>Where Employers Post jobs, find workers, hire workers, get work done in any Industry faster</p>
            </div>
            <div className="login-box">
                <form onSubmit={handleSubmit}>
                    <h1> Register</h1>

                    {currentStep === 1 && (
                        <>
                            <span>(1/3)</span>
                            <input type="text" name="name" value={formData.name} placeholder="Name" onChange={handleChange} />
                            <input type="email" name="email" value={formData.email} placeholder="Email" onChange={handleChange} />
                            <input type="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange} />
                            <button type="button" onClick={nextStep}>Next</button>
                        </>
                    )}

                    {currentStep === 2 && (
                        <>
                            <span>(2/3)</span>
                            <input type="text" name="companyName" value={formData.companyName} placeholder="Company Name" onChange={handleChange} />
                            <input type="tel" name="companyPhone" value={formData.companyPhone} placeholder="Company Phone" onChange={handleChange} />
                            <input type="text" name="companyAddress" value={formData.companyAddress} placeholder="Company Location" onChange={handleChange} />
                            <div className='steps-btn'>
                                <button type="button" onClick={prevStep}>Back</button>
                                <button type="button" onClick={nextStep}>Next</button>
                            </div>
                        </>

                    )}

                    {currentStep === 3 && (
                        <>
                            <span>(3/3)</span>
                            <fieldset>
                                <legend>Worker Skills:</legend>
                                <button
                                    type="button"
                                    onClick={() => handleInterestClick('Plumbing')}
                                    className={formData.companyInterests.includes('Plumbing') ? 'selected' : ''}
                                >
                                    Plumbing
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleInterestClick('Electrical')}
                                    className={formData.companyInterests.includes('Electrical') ? 'selected' : ''}
                                >
                                    Electrical
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleInterestClick('Carpentry')}
                                    className={formData.companyInterests.includes('Carpentry') ? 'selected' : ''}
                                >
                                    Carpentry
                                </button>
                            </fieldset>

                            <br />
                            <fieldset>

                                <button
                                    type="button"
                                    onClick={() => handleInterestClick('Buildings')}
                                    className={formData.companyInterests.includes('Buildings') ? 'selected' : ''}
                                >
                                    Buildings
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleInterestClick('IT')}
                                    className={formData.companyInterests.includes('IT') ? 'selected' : ''}
                                >
                                    IT
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleInterestClick('Cleaning')}
                                    className={formData.companyInterests.includes('Cleaning') ? 'selected' : ''}
                                >
                                    Cleaning
                                </button>
                            </fieldset>

                            <div className='steps-btn'>
                                <button type="button" onClick={prevStep}>Back</button>
                                <button type="submit">Submit</button>
                            </div>
                        </>
                    )}

                    <p>Have an account? <Link to='/login'>Login</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Register