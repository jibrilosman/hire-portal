import { BrowserRouter , Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Layout from "./components/Layout";
import axios from "axios";
import Register from "./pages/contractor/Register";
import Dashboard from "./pages/contractor/Dashboard";
import Login from "./pages/contractor/Login";
import { UserContextProvider } from "./context/userContext";
import Create from "./pages/contractor/Create";
import Edit from "./pages/contractor/Edit";
import WorkerRegister from "./pages/worker/WorkerRegister";
import WorkerLogin from "./pages/worker/WorkerLogin";
import JobDashboard from "./pages/worker/JobDashboard";
import AllJobs from "./pages/worker/AllJobs";
import Ongoing from "./pages/worker/Ongoing";
import Upcoming from "./pages/worker/Upcoming";
import Completed from "./pages/worker/Completed";
import JobDetail from "./pages/worker/JobDetail";
import WorkerDashboard from "./pages/worker/WorkerDashboard";
import VJobDashboard from "./pages/visitors/JobDashboard";

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />} >
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/worker-register" element={<WorkerRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/worker-login" element={<WorkerLogin />} />

        <Route path="dashboard/:id" element={<Dashboard />} >
          <Route index element={<Create />} />
          <Route path="edit/:id" element={<Edit />} />
        </Route>

        <Route path="job-dashboard/:id" element={<JobDashboard />} >
          <Route index element={<AllJobs />} />
          <Route path="ongoing" element={<Ongoing />} />
          <Route path="upcoming" element={<Upcoming />} />
          <Route path="completed" element={<Completed />} />
          <Route path="detail/:id" element={<JobDetail />} />
        </Route>
          {/* <Route path="worker/:id" element={<WorkerDashboard />} /> */}

          <Route path="visit-dashboard" element={<VJobDashboard />} >
          <Route index element={<AllJobs />} />
          <Route path="ongoing" element={<Ongoing />} />
          <Route path="upcoming" element={<Upcoming />} />
          <Route path="completed" element={<Completed />} />
          <Route path="detail/:id" element={<JobDetail />} />
        </Route>

      </Route>
      </Routes>
    </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
