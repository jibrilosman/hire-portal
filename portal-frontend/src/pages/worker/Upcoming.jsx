import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Upcoming = () => {
  const [jobs, setJobs] = React.useState([]);
  const navigate = useNavigate();
  const getUpcomingJobs = async () => {
    // Fetch all jobs from ./jobs if current date is less than startDate
    try {
      const { data } = await axios.get("jobs");
      if (data) {
        const upcomingJobs = data.filter((job) => {
          const startDate = new Date(job.startDate);
          const currentDate = new Date();
          return currentDate < startDate;
        });
        setJobs(upcomingJobs);
        console.log(upcomingJobs);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUpcomingJobs();
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

export default Upcoming;
