import React from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import AdminSidebar from '../components/dashboard/AdminSidebar.jsx';
import Navbar from '../components/dashboard/Navbar.jsx';
import AdminSummary from '../components/dashboard/AdminSummary.jsx';
import { Outlet } from 'react-router-dom';


function AdminDashboard() {
  const {user}=useAuth();
  
  
  return (
    <div className='flex'>
      <AdminSidebar></AdminSidebar>
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
        <Navbar></Navbar>
        <Outlet/>
        
      </div>
    </div>
  )
}

export default AdminDashboard
