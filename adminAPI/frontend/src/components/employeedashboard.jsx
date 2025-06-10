import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmployeeDashboard() {
  const [employeeName, setEmployeeName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "employee") {
      navigate("/");
    } else {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setEmployeeName(decoded.name);
    }
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  
  return (
    <div className="container mt-4">
      <h2>Hello Employee - {employeeName}</h2>
      <button onClick={logout} className="btn btn-danger mb-3">Logout</button>
     
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh", backgroundColor: "#f8f9fa" }}
      >
        <div
          className="p-4 bg-white"
          style={{
            marginLeft: "500px",
            width: "400px",
            border: "2px solid #28a745",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h3 className="mb-4 text-center text-success">Employee Dashboard</h3>

          <p className="text-center">Welcome, {employeeName}!</p>

       
        </div>
      </div>
    </div>
  );
}
