import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ManagerDashboard() {
  const [managerName, setManagerName] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "manager") {
      navigate("/");
    } else {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setManagerName(decoded.name);
    }
  }, [navigate]);

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post("http://localhost:8888/add-employee", {
        name: employeeName,
        email: employeeEmail,
        password: employeePassword
      }, {
        headers: {
          Authorization: token
        }
      });

      setMessage(res.data.msg || "Employee added successfully");

      setEmployeeName("");
      setEmployeeEmail("");
      setEmployeePassword("");
    } catch (error) {
      setMessage(error.response?.data?.msg || "Failed to add employee");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };


  return (
    <div className="container mt-4">
      <h2>Hello Manager - {managerName}</h2>
      <button onClick={logout} className="btn btn-danger mb-3">Logout</button>
      <button onClick={() => navigate("/view-all-employee")} className="btn btn-primary mb-3">View All Employees</button>

      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh", backgroundColor: "#f8f9fa" }}
      >
        <form
          onSubmit={handleAddEmployee}
          className="p-4 bg-white"
          style={{
            marginLeft: "500px",
            width: "400px",
            border: "2px solid #007bff",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h3 className="mb-4 text-center text-primary">Add Employee</h3>

          <div className="mb-3">
            <label htmlFor="employeeName" className="form-label">
              Employee Name
            </label>
            <input
              type="text"
              id="employeeName"
              className="form-control"
              placeholder="Enter employee name"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="employeeEmail" className="form-label">
              Employee Email
            </label>
            <input
              type="email"
              id="employeeEmail"
              className="form-control"
              placeholder="Enter employee email"
              value={employeeEmail}
              onChange={(e) => setEmployeeEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="employeePassword" className="form-label">
              Employee Password
            </label>
            <input
              type="password"
              id="employeePassword"
              className="form-control"
              placeholder="Enter employee password"
              value={employeePassword}
              onChange={(e) => setEmployeePassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Add Employee
          </button>

          {message && (
            <div className="alert alert-info mt-3 text-center" role="alert">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
