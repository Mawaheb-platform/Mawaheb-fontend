// src/pages/Home.js
import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/layout/Sidebar';
import Login from './Login';
import AdminDashboard from './adminDashboard/AdminDashboard';
import ScholarshipStudentDashboard from './scholarshipStudentPages/ScholarshipStudentDashboard';
import EmployeeDashboard from './employeeDashboard/EmployeeDashboard';
import Waiting from './Waiting';

const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.token);
  // const userRole = useSelector((state) => state.auth.user.role);
  // console.log("this is userRole", userRole)
  return (
    <div>
     
  {isLoggedIn ? (
    <>
      {/* {userRole === 'Admin' ? <AdminDashboard /> : null}
      {userRole === 'User' ? <Waiting /> : null} 
      {userRole === 'Employee' ? <EmployeeDashboard /> : null}
      {userRole === 'Scholarship Student' ? <ScholarshipStudentDashboard /> : null} */}
    </>
  ) : (
    <Login />
  )}
</div>
  );
};

export default Home;
