import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import "./dashboard.css";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [contractor, setContractor] = useState(null);
  const [values, setValues] = useState({
    title: "",
    description: "",
    address: "",
    status: "",
    startDate: "",
    endDate: "",
    skills: [],
  });
  const [errors, setErrors] = useState({});

  const fetchJob = async () => {
    try {
      const response = await axios.get(`/jobs/${id}`);
      setValues({
        title: response.data.title,
        description: response.data.description,
        address: response.data.address,
        status: response.data.status,
        startDate: new Date(response.data.startDate)
          .toISOString()
          .split("T")[0],
        endDate: new Date(response.data.endDate).toISOString().split("T")[0],
        skills: response.data.skills,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchJob();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`contractors/jobs/${id}`, values);

      alert("Job updated successfully");
      navigate("..");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        alert("An error occurred while updating the job.");
      }
    }
  };

  const handleSkillClick = (skill) => {
    // Check if the skill is already selected
    const isSkillSelected = values.skills.includes(skill);
    if (isSkillSelected) {
      // Remove the skill from
      const updatedSkills = values.skills.filter((i) => i !== skill);
      setValues((prevData) => ({
        ...prevData,
        skills: updatedSkills,
      }));
    } else {
      // Add the skill to the list
      const updatedSkills = [...values.skills, skill];
      setValues((prevData) => ({
        ...prevData,
        skills: updatedSkills,
      }));
    }
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onAfterClose={() => navigate("..")}
        contentLabel="Modal"
        ariaHideApp={false}
        className="modal"
        style={{
          Modal: {},
          overlay: {
            backgroundColor: "rgba(43, 120, 226, 0.5)",
          },
        }}
      >
        <h2 style={{ textAlign: "center" }}>Update Job</h2>
        <form onSubmit={handleEdit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
          {errors.title && <small className="error">{errors.title}</small>}
          <textarea
            name="description"
            placeholder="Description"
            value={values.description}
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
          />
          {errors.description && (
            <small className="error">{errors.description}</small>
          )}
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={values.address}
            onChange={(e) => setValues({ ...values, address: e.target.value })}
          />
          {errors.address && <small className="error">{errors.address}</small>}
          <input
            type="date"
            name="startDate"
            placeholder="Star tDate"
            value={values.startDate}
            onChange={(e) =>
              setValues({ ...values, startDate: e.target.value })
            }
          />
          {errors.startDate && (
            <small className="error">{errors.startDate}</small>
          )}
          <input
            type="date"
            name="endDate"
            placeholder="End Date"
            value={values.endDate}
            onChange={(e) => setValues({ ...values, endDate: e.target.value })}
          />
          Selected Skills:
          <div>
            {values.skills.map((skill, index) => (
              <span key={index}>-{skill}</span>
            ))}
          </div>
          {values.skills && (
            <fieldset>
              <button
                type="button"
                onClick={() => handleSkillClick("Buildings")}
                className={
                  values.skills.includes("Buildings") ? "selected" : ""
                }
              >
                Buildings
              </button>
              <button
                type="button"
                onClick={() => handleSkillClick("IT")}
                className={values.skills.includes("IT") ? "selected" : ""}
              >
                IT
              </button>
              <button
                type="button"
                onClick={() => handleSkillClick("Cleaning")}
                className={values.skills.includes("Cleaning") ? "selected" : ""}
              >
                Cleaning
              </button>
            </fieldset>
          )}
          <br />
          {values.skills && (
            <fieldset>
              <button
                type="button"
                onClick={() => handleSkillClick("Photography")}
                className={
                  values.skills.includes("Photography") ? "selected" : ""
                }
              >
                Photography
              </button>
              <button
                type="button"
                onClick={() => handleSkillClick("Artists")}
                className={values.skills.includes("Artists") ? "selected" : ""}
              >
                Artists
              </button>
              <button
                type="button"
                onClick={() => handleSkillClick("Hotel")}
                className={values.skills.includes("Hotel") ? "selected" : ""}
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

export default Edit;
