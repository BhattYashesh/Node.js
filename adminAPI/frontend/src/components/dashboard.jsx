import React, { useEffect , useState} from 'react'
import { useNavigate  } from 'react-router-dom';
import axios  from 'axios';

export default function Dashboard() {

    const [adminName, setAdminName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [managerPassword, setManagerPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate()

  
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/")
    }else{
      fetchAdmin(token)
    }
  },[navigate])

  const fetchAdmin = async ()=>{
     try {
    const res = await axios.get("http://localhost:8888/admin", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setAdminName(res.data.name);
  } catch (error) {
    console.error(error);
    alert("Session expired. Please login again.");
    logout();
  }
  }

   const handleAddManager = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post("http://localhost:8888/add-manager", {
        name: managerName,
        email: managerEmail,
        password: managerPassword,
        role: "manager"
      }, {
        headers: {
          Authorization: token
        }
      });

      setMessage(res.data.msg || "Manager added successfully");
     
      setManagerName("");
      setManagerEmail("");
      setManagerPassword("");
    } catch (error) {
      setMessage(error.response?.data?.msg || "Failed to add manager");
    }
  };

  
  
  

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };



  return (
   <div className="container mt-4">
      <h2>Hello Admin - {adminName}</h2>
      <button onClick={logout} className="btn btn-danger mb-3">Logout</button>
      <button onClick={() => navigate("/view-all-manager")} className="btn btn-primary mb-3">View All Managers</button>

 <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "70vh", backgroundColor: "#f8f9fa" }}
    >
      <form
       onSubmit={handleAddManager} 
        className="p-4 bg-white"
        style={{
            marginLeft:"500px",
          width: "400px",
          border: "2px solid #007bff",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h3 className="mb-4 text-center text-primary">Add Manager</h3>

        <div className="mb-3">
          <label htmlFor="managerName" className="form-label">
            Manager Name
          </label>
          <input
            type="text"
            id="managerName"
            className="form-control"
            placeholder="Enter manager name"
            value={managerName}
            onChange={(e) => setManagerName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="managerEmail" className="form-label">
            Manager Email
          </label>
          <input
            type="email"
            id="managerEmail"
            className="form-control"
            placeholder="Enter manager email"
            value={managerEmail}
            onChange={(e) => setManagerEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="managerPassword" className="form-label">
            Manager Password
          </label>
          <input
            type="password"
            id="managerPassword"
            className="form-control"
            placeholder="Enter manager password"
            value={managerPassword}
            onChange={(e) => setManagerPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Add Manager
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