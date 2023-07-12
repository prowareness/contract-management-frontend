import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';

const SignupPage = ({ handleSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [department, setDepartment] = useState('');
    const [designation, setDesignation] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            "email": email, "password": password, "firstName": firstName, "lastName": lastName,
            "phoneNumber": phoneNumber, "department": department, "designation": designation
        };
        try {
            const response = await handleSignup(user);
            if(response && response.id){
                const {id} = response;
                const userData = { ...user, id };

                localStorage.setItem('user', JSON.stringify(userData));

                navigate('/login');
            }
            else{
                console.log("error occurred during signup");
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="signup-page">
            <nav className="navbar">
                <div className="logo">
                    <img
                        className="logo-image"
                        src="https://devon.global/wp-content/uploads/2016/12/devon-logo-blue.png"
                        alt="Logo"
                    />
                </div>
                <div className="search-box">
                    <input type="text" className="search-input" placeholder="Search" />
                    <i className="fas fa-search search-icon"></i>
                </div>
                <ul className="nav-links">
                    <li className="nav-item">
                        <a href="/services">Services</a>
                    </li>
                    <li className="nav-item">
                        <a href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="/login">Sign In</a>
                    </li>
                </ul>
            </nav>
            <div className="signup-container">
                <img className="signup-vector" src="https://tekpros.com/images/asset-management/Contract-Management/Vector-Smart-Object.png" alt="Vector" />
                <div className="signup-box">
                    <h1 className="signup-title">Sign Up</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)} required
                            />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} required
                            />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)} required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Department"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)} required
                            />
                            <select
                                type="text"
                                className="form-control"
                                placeholder="Designation"
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)} required>
                                <option value="">Designation</option>
                                <option value="Assistant Manager">Assistant Manager</option>
                                <option value="Deputy Manager">Deputy Manager</option>
                                <option value="Cheif Manager">Cheif Manager</option>
                                <option value="Supervisor">Supervisor</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;