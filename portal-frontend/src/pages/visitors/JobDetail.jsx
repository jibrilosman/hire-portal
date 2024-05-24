import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./jobboard.css";

const JobDetail = () => {
  const [job, setJob] = useState(null);
  const [user, setUser] = useState(null); //[1]
  const [workerId, setWorkerId] = useState(null); //[2
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`/jobs/${id}`);
        setJob(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJob();
  }, [id]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      console.log(token);
      try {
        const { data } = await axios.get("contractors/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser(data.name);
        setWorkerId(data.id);
        console.log(data.id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  // Onclick function to apply for a job
  const applyToJob = async () => {
    try {
      const response = await axios.post(`/jobs/${id}/apply`, {
        workerId: workerId, // Include worker ID in the request body
      });
      console.log(response.data);
      alert("Applied successfully");
      navigate(`..`);
    } catch (error) {
      console.error("Error applying to job:", error);
      alert("Failed to apply");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/worker-login");
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div className="container job-detail-container">
      <div key={job._id} className="job-card-detail">
        <h1>{job.title}</h1>
        <p>{job.address}</p>
        <p>{job.description}</p>
        <div className="job-duration">
          <div>
            <strong>From:</strong>
            <p>{new Date(job.startDate).toLocaleDateString()}</p>
          </div>
          <div>
            <strong>To:</strong>
            <p>{new Date(job.endDate).toLocaleDateString()}</p>
          </div>
        </div>
        <h1>Skills:</h1>
        <ul>
          {job.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
      {!user ? (
        <div className="apply-button">
          <button type="button" onClick={applyToJob}>
            Apply
          </button>
        </div>
      ) : (
        <div className="apply-button">
          <button type="button" onClick={handleLoginRedirect}>
            Login to Apply
          </button>
        </div>
      )}
      {/* <div className="apply-button">
        <button type="button" onClick={() => applyToJob(workerId)}>
          Apply
        </button>
      </div> */}
    </div>
  );
};

export default JobDetail;
