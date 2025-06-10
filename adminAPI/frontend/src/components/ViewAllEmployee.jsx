import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ViewAllEmployee() {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        // Only allow manager to view this page
        if (!token || role !== "manager") {
            navigate("/");
        } else {
            fetchEmployees(token);
        }
    }, [navigate]);

    const fetchEmployees = async (token) => {
        try {
            const res = await axios.get("http://localhost:8888/view-employee", {
                headers: {
                    Authorization: token
                }
            });

            setEmployees(res.data.data || []);
        } catch (error) {
            console.error("Failed to fetch employees:", error);
        }
    };

    const deleteEmployee = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8888/employee/${id}`);
            alert("Employee deleted!");
            fetchEmployees();  // Refresh the list
        } catch (error) {
            console.error("Failed to delete employee:", error);
            alert("Failed to delete employee!");
        }
    };

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="container mt-4">
            <h2>All Employees</h2>
            <button onClick={logout} className="btn btn-danger mb-3">Logout</button>

            {employees.length === 0 ? (
                <p>No employees found.</p>
            ) : (
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp, index) => (
                            <tr key={emp._id}>
                                <td>{index + 1}</td>
                                <td>{emp.name}</td>
                                <td>{emp.email}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteEmployee(emp._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

