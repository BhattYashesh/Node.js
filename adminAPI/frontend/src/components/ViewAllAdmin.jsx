import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ViewAllAdmin() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:8888/admin", {
        headers: {
          Authorization: token
        }
      });
      setAdmins(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>All Admins</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
