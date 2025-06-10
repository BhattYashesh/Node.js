import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
   

    const navigate = useNavigate()

    const handleRegister = async ()=>{
        await axios.post("http://localhost:8888/register",{name,email,password})
        .then((res)=>{
            alert(res.data.msg)
            navigate("/")
        })
    }
  return (
   

    <div className="d-flex justify-content-center  align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '600px' , marginLeft:"400px" }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Register</h3>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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

          <button
            className="btn btn-primary w-100"
            onClick={handleRegister}
          >
            Register
          </button>

          <p className="text-center mt-3 mb-0">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}