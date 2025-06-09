// import React from 'react'
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

// function Signup() {
//     const navigate = useNavigate()

//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: ''
//     })

//     const handleChange = (e) => {
//         const { name, value } = e.target
//         setFormData({ ...formData, [name]: value })
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()

//         axios.post('http://localhost:3000/signup', formData)
//             .then((response) => {
//                 console.log('Signup successful:', response.data)
//                 navigate('/')
//             })
//             .catch((error) => {
//                 console.error('There was an error signing up:', error)
//             })
//     }

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
//                 <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         id="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
//                     <input
//                         type="email"
//                         name="email"
//                         id="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
//                     <input
//                         type="password"
//                         name="password"
//                         id="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
//                     />
//                 </div>
//                 <div className='flex flex-col gap-2'>
//                     <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200">Sign Up</button>
//                     <button className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition duration-200" onClick={() => navigate('/')}>Goto Login</button>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default Signup


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/signup', formData)
            .then((response) => {
                console.log('Signup successful:', response.data);
                navigate('/');
            })
            .catch((error) => {
                console.error('There was an error signing up:', error);
            });
    };

    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h3 className="card-title text-center mb-4 text-primary">Create an Account</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="d-grid mb-3">
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </div>
                    <div className="text-center">
                        <small>
                            Already have an account?{' '}
                            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
                                Go to Login
                            </a>
                        </small>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;

