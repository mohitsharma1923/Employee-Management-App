import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelpers";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [employee, setEmployee] = useState({
    name:'',
    maritalStatus:'',
    designation:'',
    salary:'',
    department:''
  });
  const [departments,setDepartments]=useState(null)
  const { id } = useParams();
  const navigate = useNavigate();


    useEffect(() => {
      const getDepartments = async () => {
        const departments = await fetchDepartments();
        setDepartments(departments);
      };
      getDepartments();
    }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4500/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data)
        if (response.data.success && response.data.employees) {
            const emp = response.data.employees;
            
            setEmployee((prev) => ({
              ...prev,
              name: emp.userId?.name || '',
              maritalStatus: emp.maritalStatus || '',
              designation: emp.designation || '',
              salary: emp.salary || '',
              department: emp.department?._id || '',
            }));
          }
          
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployees();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevData)=>({...prevData,[name]:value}))
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
       ` http://localhost:4500/api/employee/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>{departments && employee ?(
    <div className="max-w-4xl mx-auto mt-10 bg-White p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6"> Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={employee.name}
              placeholder="Enter name"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Material Status
            </label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              value={employee.maritalStatus}
              placeholder="Enter Marital Status"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Marital Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              onChange={handleChange}
              value={employee.designation}
              placeholder="Enter Designation"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              onChange={handleChange}
              value={employee.salary}
              placeholder="Enter Salary"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
              onChange={handleChange}
              value={employee.department}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="sunmit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Edit Employee
        </button>
      </form>
    </div>
    ):<div> Loading...</div>}</>
  );
};

export default Edit;
