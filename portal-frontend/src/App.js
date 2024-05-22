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

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />} >
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="dashboard/:id" element={<Dashboard />} >
          <Route index element={<Create />} />
          <Route path="edit/:id" element={<Edit />} />
        </Route>
      </Route>
      </Routes>
    </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
