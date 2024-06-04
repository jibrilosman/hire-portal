import { useEffect, useState } from "react";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import Modal from "react-modal";
import axios from "axios";
import "../../index.css";
import "./dashboard.css";

const Create = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [contractor, setContractor] = useState(null); //[1
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    startDate: "",
    endDate: "",
    skills: [],
  });

  useEffect(() => {
    axios
      .get(`https://hire-portal-ypuf.onrender.com/api/contractors/${id}/dashboard`)
      .then((response) => {
        setContractor(response.data);
        setFormData({
          ...formData,
          contractorName: response.data.name,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // handle add job
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://hire-portal-ypuf.onrender.com/api/contractors/${id}/jobs`, formData);
      alert("Job created successfully");
      setModalIsOpen(false);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  // delete job
  const handleDelete = async (id) => {
    window.confirm("Are you sure you want to delete this job?");
    try {
      await axios.delete(`https://hire-portal-ypuf.onrender.com/api/contractors/jobs/${id}`);
      setJobs(jobs.filter((job) => job._id !== id));
      alert("Job deleted successfully");
      navigate(".");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInterestClick = (skill) => {
    // Check if the interest is already selected
    const isSkillSelected = formData.skills.includes(skill);
    if (isSkillSelected) {
      // Remove the interest from
      const updatedSkills = formData.skills.filter((i) => i !== skill);
      setFormData({ ...formData, skills: updatedSkills });
    } else {
      // Add the interest to the list
      const updatedSkills = [...formData.skills, skill];
      setFormData({ ...formData, skills: updatedSkills });
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div className="content-container">
        <Link onClick={openModal}>
          <IoMdAddCircleOutline className="add-icon" />
        </Link>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>S.Date</th>
              <th>E.Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contractor &&
              contractor.jobs.map((job, index) => (
                <tr key={index}>
                  <td>{job.title}</td>
                  <td>{new Date(job.startDate).toISOString().split("T")[0]}</td>
                  <td>{new Date(job.endDate).toISOString().split("T")[0]}</td>
                  <td className="edit">
                    <span className="edit_span">
                      <Link className="edit_link" to={`edit/${job._id}`}>
                        Edit
                      </Link>
                    </span>
                    <span className="delete_span">
                      <Link
                        className="delete_link"
                        to="#"
                        onClick={() => handleDelete(job._id)}
                      >
                        Delete
                      </Link>
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Outlet />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Modal"
        ariaHideApp={false}
        className="modal"
      >
        <h2>Create Job</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <small className="error">{errors.title}</small>}
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && (
            <small className="error">{errors.description}</small>
          )}
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <small className="error">{errors.address}</small>}
          <input
            type="date"
            name="startDate"
            placeholder="Star tDate"
            value={formData.startDate}
            onChange={handleChange}
          />
          {errors.startDate && (
            <small className="error">{errors.startDate}</small>
          )}
          <input
            type="date"
            name="endDate"
            placeholder="End Date"
            value={formData.endDate}
            onChange={handleChange}
          />
          <br />
          <select
            name="contractorName"
            value={formData.contractorName}
            onChange={handleChange}
          >
            <option value="">Select Contractor</option>
            {contractor && (
              <option value="contractor">{contractor.name}</option>
            )}
          </select>
          <br />
          Selected Skills:
          <div>
            {formData.skills.map((skill, index) => (
              <span key={index}>-{skill}</span>
            ))}
          </div>
          {formData.skills && (
            <fieldset>
              <button
                type="button"
                onClick={() => handleInterestClick("Buildings")}
                className={
                  formData.skills.includes("Buildings") ? "selected" : ""
                }
              >
                Buildings
              </button>
              <button
                type="button"
                onClick={() => handleInterestClick("IT")}
                className={formData.skills.includes("IT") ? "selected" : ""}
              >
                IT
              </button>
              <button
                type="button"
                onClick={() => handleInterestClick("Cleaning")}
                className={
                  formData.skills.includes("Cleaning") ? "selected" : ""
                }
              >
                Cleaning
              </button>
            </fieldset>
          )}
          <br />
          {formData.skills && (
            <fieldset>
              <button
                type="button"
                onClick={() => handleInterestClick("Photography")}
                className={
                  formData.skills.includes("Photography") ? "selected" : ""
                }
              >
                Photography
              </button>
              <button
                type="button"
                onClick={() => handleInterestClick("Artists")}
                className={
                  formData.skills.includes("Artists") ? "selected" : ""
                }
              >
                Artists
              </button>
              <button
                type="button"
                onClick={() => handleInterestClick("Hotel")}
                className={formData.skills.includes("Hotel") ? "selected" : ""}
              >
                Hotel
              </button>
            </fieldset>
          )}
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </>
  );
};

export default Create;
