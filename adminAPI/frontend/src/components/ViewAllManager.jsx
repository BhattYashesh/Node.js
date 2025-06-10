import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ViewAllManager() {
    const [managers, setManagers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchManagers();
    }, []);

    const fetchManagers = async () => {
        try {
            const response = await axios.get('http://localhost:8888/manager');
            setManagers(response.data.data);
        } catch (error) {
            console.error('Error fetching managers:', error);
        }
    };

    const deleteManager = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this manager?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8888/manager/${id}`);
            alert("Manager deleted!");
            fetchManagers();  // Refresh the list
        } catch (error) {
            console.error("Failed to delete manager:", error);
            alert("Failed to delete manager!");
        }
    };

    const goBack = () => {
        navigate('/manager-dashboard');
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-primary">All Managers</h2>
            <button onClick={goBack} className="btn btn-secondary mb-3">
                Back to Manager Dashboard
            </button>

            {managers.length === 0 ? (
                <p>No managers found.</p>
            ) : (
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {managers.map((manager, index) => (
                            <tr key={manager._id}>
                                <td>{index + 1}</td>
                                <td>{manager.name}</td>
                                <td>{manager.email}</td>
                                <button
                                    className="btn btn-danger bg-danger text-light btn-sm"
                                    onClick={() => deleteManager(manager._id)}
                                >
                                    Delete
                                </button>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
