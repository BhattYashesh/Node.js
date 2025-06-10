import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  
  const navigate = useNavigate();

  const handleLogin = async () => {

     if (!role) {
    alert("Please select a role");
    return;
  }



   await axios.post("http://localhost:8888/login", { email, password, role })
    .then((res) => {
      alert(res.data.msg);
      if (res.data.code === 100) {
        navigate("/register");
      } else if (res.data.code === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        if (res.data.role === "admin") {
          navigate("/dashboard");
        } else if (res.data.role === "manager") {
          navigate("/manager-dashboard");
        } else if (res.data.role === "employee") {
          navigate("/employee-dashboard");
        }
      } else {
        navigate("/");
      }
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '600px', marginLeft: "400px" }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Login</h3>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <select value={role} onChange={(e) => setRole(e.target.value)} className="form-control mb-3">
  <option value="">Select Role</option>
  <option value="admin">Admin</option>
  <option value="manager">Manager</option>
  <option value="employee">Employee</option>
</select>

          <button
            className="btn btn-success w-100"
            onClick={handleLogin}
          >
            Login
          </button>

          <p className="text-center mt-3 mb-0">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
