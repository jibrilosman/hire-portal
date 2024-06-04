import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./jobboard.css";
import "../../index.css";

const Ongoing = () => {
  const [jobs, setJobs] = React.useState([]);
  const navigate = useNavigate();

  const getOngoingJobs = async () => {
    // Fetch all jobs from ./jobs if current date is greater than or equal to startDate and less than or equal to endDate
    try {
      const { data } = await axios.get("https://hire-portal-ypuf.onrender.com/api/jobs");
      if (data) {
        const ongoingJobs = data.filter((job) => {
          const startDate = new Date(job.startDate);
          const endDate = new Date(job.endDate);
          const currentDate = new Date();
          return currentDate >= startDate && currentDate <= endDate;
        });
        setJobs(ongoingJobs);
        console.log(ongoingJobs);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOngoingJobs();
  }, []);

  const detailJob = (id) => {
    navigate(`../detail/${id}`);
  };

  return (
    <>
      <div className="container job-container">
        {jobs.map((job, i) => (
          <div
            key={job._id}
            className="job-card"
            onClick={() => detailJob(job._id)}
          >
            <h3>Job Id: {i + 1}</h3>
            <h1>{job.title}</h1>
            <p>{job.address}</p>
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
          </div>
        ))}
      </div>
    </>
  );
};

export default Ongoing;
