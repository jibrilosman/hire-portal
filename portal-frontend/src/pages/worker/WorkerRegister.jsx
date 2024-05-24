import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/HireKey.jpg";
import axios from "axios";

const WorkerRegister = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skills: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSkillClick = (skill) => {
    // Check if the skill is already selected
    const isSkillSelected = formData.skills.includes(skill);
    if (isSkillSelected) {
      // Remove the skill from
      const updatedSkills = formData.skills.filter((s) => s !== skill);
      setFormData({ ...formData, skills: updatedSkills });
    } else {
      // Add the skill to the list
      const updatedSkills = [...formData.skills, skill];
      setFormData({ ...formData, skills: updatedSkills });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("workers/register", formData);
      alert("Account created successfully");
      navigate("/login");
    } catch (error) {
      setErrors(error.response.data);
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
        <form onSubmit={handleSubmit}>
          <h1> Register</h1>

          {currentStep === 1 && (
            <>
              <span>(1/2)</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Name"
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="Password"
                onChange={handleChange}
              />
              <button type="button" onClick={nextStep}>
                Next
              </button>
            </>
          )}

          {currentStep === 2 && (
            <>
              <span>(2/2)</span>
              <fieldset>
                <legend>Worker Skills:</legend>
                <button
                  type="button"
                  onClick={() => handleSkillClick("Plumbing")}
                  className={
                    formData.skills.includes("Plumbing") ? "selected" : ""
                  }
                >
                  Plumbing
                </button>
                <button
                  type="button"
                  onClick={() => handleSkillClick("Electrical")}
                  className={
                    formData.skills.includes("Electrical") ? "selected" : ""
                  }
                >
                  Electrical
                </button>
                <button
                  type="button"
                  onClick={() => handleSkillClick("Carpentry")}
                  className={
                    formData.skills.includes("Carpentry") ? "selected" : ""
                  }
                >
                  Carpentry
                </button>
              </fieldset>

              <br />
              <fieldset>
                <button
                  type="button"
                  onClick={() => handleSkillClick("Buildings")}
                  className={
                    formData.skills.includes("Buildings") ? "selected" : ""
                  }
                >
                  Buildings
                </button>
                <button
                  type="button"
                  onClick={() => handleSkillClick("IT")}
                  className={formData.skills.includes("IT") ? "selected" : ""}
                >
                  IT
                </button>
                <button
                  type="button"
                  onClick={() => handleSkillClick("Cleaning")}
                  className={
                    formData.skills.includes("Cleaning") ? "selected" : ""
                  }
                >
                  Cleaning
                </button>
              </fieldset>

              <div className="steps-btn">
                <button type="button" onClick={prevStep}>
                  Back
                </button>
                <button type="submit">Submit</button>
              </div>
            </>
          )}

          <p>
            Have an account? <Link to="/worker-login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default WorkerRegister;
