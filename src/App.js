// src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import StudentReport from "./pages/StudentReport";
import StudentCourse from "./pages/Course";
import StudentEvent from "./pages/Event";
import Ticket from "./pages/Ticket";
import Note from "./pages/Note";
import StudentAchievement from "./pages/Achievement";
import StudentCertificate from "./pages/Certificate";
import Header from "./components/layout/Header";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Difficulties from "./pages/Difficulties";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import ScholarshipStudentForm from "./pages/scholarshipStudentPages/ScholarshipStudentForm";
import UniversityDetails from "./pages/UniversityDetails";
import SemesterList from "./pages/SemesterList";
import SemesterDetails from "./pages/SemesterDetails";
import StudentReportPage from "./pages/scholarshipStudentPages/StudentReportPage";
import University from "./pages/scholarshipStudentPages/University";
import StudentReportList from "./pages/scholarshipStudentPages/StudentReportList ";
import FinancialReport from "./pages/FinancialReport";
import Sidebar from "./components/layout/Sidebar";
import StudentDetails from "./pages/adminDashboard/StudentDetails";
import { useSelector } from "react-redux";
import CreateTicket from "./pages/CreateTicket";
import TicketList from "./pages/TicketList";
import NotFound from "./pages/404";
import ProfileComponent from "./pages/NewProfile";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.token);
  // const userRole = useSelector((state) => state.auth.user.role);


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
        {/* must have if else statement to handle 404 page if user play with slug or did not have permission to open specific page */}
          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/pro" element={<ProfileComponent />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/student/report" element={<StudentReport />} /> */}
          <Route path="/student/courses" element={<StudentCourse />} />
          <Route path="/student/events" element={<StudentEvent />} />
          <Route path="/student/tickets" element={<Ticket />} />
          <Route path="/notes" element={<Note />} />
          <Route
            path="/student/achievements"
            element={<StudentAchievement />}
          />
          <Route
            path="/student/certificates"
            element={<StudentCertificate />}
          />
          <Route path="/student/difficulties" element={<Difficulties />} />
          <Route path="/student/form" element={<ScholarshipStudentForm />} />
          <Route path="/universityDetails" element={<UniversityDetails />} />
          <Route path="/semester-list" element={<SemesterList />} />
          <Route path="/semester-details" element={<SemesterDetails />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route
            path="/student/financial-report"
            element={<FinancialReport />}
          />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/student-report" element={<StudentReportPage />} />
          <Route path="/my-reports" element={<StudentReportList />} />
          <Route path="/student/university" element={<University />} />
          <Route path="/student/details" element={<StudentDetails />} />
          <Route path="/create-ticket" element={<CreateTicket />} />
          <Route path="/ticket-list" element={<TicketList />} />
          <Route path="/*" element={<NotFound/>} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
