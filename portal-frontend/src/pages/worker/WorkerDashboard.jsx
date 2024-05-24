import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const WorkerDashboard = () => {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorker = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get(`/workers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWorker(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWorker();
  }, [id]);

  if (!worker) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <h1>Worker Dashboard</h1>
      <h3>Applied Jobs</h3>
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Job Description</th>
            <th>Location</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Contractor</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {worker.appliedJobs.map((job) => (
            <tr key={job._id}>
              <td>{job.title}</td>
              <td>{job.description}</td>
              <td>{job.location}</td>
              <td>{job.startDate}</td>
              <td>{job.endDate}</td>
              <td>{job.contractor.name}</td>
              <td>{job.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkerDashboard;
