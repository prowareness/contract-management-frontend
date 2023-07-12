import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './LoginPage.css';

const LoginPage = ({ handleLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user= {email,password};

        await handleLogin(user,navigate);
        setEmail('');
        setPassword('');
        
        };

    return (
        <div className="login-page">
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
                        <a href="/signup">Sign Up</a>
                    </li>
                </ul>
            </nav>
            <div className="login-container">
                <img className="login-vector" src="https://tekpros.com/images/asset-management/Contract-Management/Vector-Smart-Object.png" alt="Vector" />
                <div className="login-box">
                    <h1 className="login-title">Login</h1>
                    {/* {loginSuccess && <p className="success-message">Login successful!</p>} */}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Log in</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
