import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelpers";
import DataTable from "react-data-table-component";

const List = () => {

  const [employee,setEmployee]=useState([]);
  const [empLoading,setEmpLoading]=useState(false)
  const [filterdEmployee,setFilterdEmployee]=useState([])

  useEffect(()=>{
    const fetchEmployee=async()=>{
      setEmpLoading(true)
      try {
        const response=await axios.get("http://localhost:4500/api/employee",{
          headers:{
            "Authorization":`Bearer ${localStorage.getItem('token')}`
          }
          
        })
       

        if(response.data.success){
          let sno=1;
          const data=await response.data.employee.map((emp)=>(
            {
              _id:emp._id,
              sno:sno++,
              dep_name:emp.department.dep_name,
              name:emp.userId.name,
              dob:new Date(emp.dob).toLocaleDateString(),
              profileImage:<img width={40} height={40} className='rounded-full h-10'  src={`http://localhost:4500/${emp.userId.profileImage}`}/> ,
              action:(<EmployeeButtons  _id={emp._id} />),
            }
          ))
          setEmployee(data)
          setFilterdEmployee(data)
        }
      } catch (error) {
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
      }
      }finally{
        setEmpLoading(false)
      }
    };
    fetchEmployee();
  },[])

  const handleFilter=(e)=>{
    const filteredData=employee.filter((emp)=>emp.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilterdEmployee(filteredData)
  }


  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by Dep name"
          className="px-4 py-0.5 border"
          onChange={handleFilter}
          
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>
      <div className="mt-6">
        <DataTable columns={columns} data={filterdEmployee} pagination/>
      </div>
    </div>
  );
};

export default List;
