import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./jobboard.css";
import "../../index.css";
import "./jobboard.css";

const AllJobs = () => {
  const [allJobs, setAllJobs] = useState([]);
  const navigate = useNavigate();
  const getAllJobs = async () => {
    try {
      const { data } = await axios.get("/jobs");
      setAllJobs(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  const detailJob = (id) => {
    navigate(`./detail/${id}`);
  };

  return (
    <>
      <div className="container job-container">
        {allJobs.map((allJob, i) => (
          <div
            key={allJob._id}
            className="job-card"
            onClick={() => detailJob(allJob._id)}
          >
            <h3>Job Id: {i + 1}</h3>
            <h1>{allJob.title}</h1>
            <p>{allJob.address}</p>
            <div className="job-duration">
              <div>
                <strong>From:</strong>
                <p>{new Date(allJob.startDate).toISOString().split("T")[0]}</p>
              </div>
              <div>
                <strong>To:</strong>
                <p>{new Date(allJob.endDate).toISOString().split("T")[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllJobs;
