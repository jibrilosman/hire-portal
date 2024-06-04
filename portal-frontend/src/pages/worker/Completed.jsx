import { useEffect, useState } from "react";
import axios from "axios";

const Completed = () => {
  const [jobs, setJobs] = useState([]);

  const getCompletedJobs = async () => {
    // Fetch all jobs from ./jobs if current date is greater than endDate
    try {
      const { data } = await axios.get("https://hire-portal-ypuf.onrender.com/api/jobs");
      if (data) {
        const completedJobs = data.filter((job) => {
          const endDate = new Date(job.endDate);
          const currentDate = new Date();
          return currentDate > endDate;
        });
        setJobs(completedJobs);
        console.log(completedJobs);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCompletedJobs();
  }, []);

  return (
    <>
      <div className="container job-container">
        {jobs.map((job, i) => (
          <div key={job._id} className="job-card">
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

export default Completed;
