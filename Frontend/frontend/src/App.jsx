import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EmailPage from "./pages/EmailPage";
import OtpPage from "./pages/OtpPage";
import Dashboard from "./pages/DashBoardPage";
import Status from "./pages/Status";
// import Leaves from "./pages/Leaves";
import Attendance from "./pages/Attendence";
import Layout from "./Layout/Layout";
import CompanyPolicy from "./pages/CompanyPolicy";
function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<EmailPage />} />
        <Route path="/verify" element={<OtpPage />} />

        {/* Protected Layout Routes */}
        <Route element={<Layout />}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/status" element={<Status />} />

          {/* Leaves Parent */}
         <Route path="/attendance" element={<Attendance />} />

          <Route path="/company-policy" element={<CompanyPolicy />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;