import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => (

    <div className="homepage-container">
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
                    <a href="/signup">Sign Up</a>
                </li>
                <li className="nav-item">
                    <a href="/login">Sign In</a>
                </li>
            </ul>
        </nav>
        
            <div className="homepage-content">
                <div className="homepage-image">
                    <img
                        src="https://www.gdprregister.eu/wp-content/uploads/2020/11/contract-lifecycle-management.png"
                        alt="Contract Lifecycle Management"
                    />
                </div>
                <div className="homepage-text">
                    <h1 className="homepage-title">
                        <span className="gradient-text">Contract Management</span> <br />
                        <span className="gradient-text-1">System</span>
                    </h1>
                    <p className="homepage-description">Streamline your Contracts, Simplify your Success</p>
                    <Link to="/services"><button className='get-started-button' href='/services'>Get started</button></Link>
                </div>
            </div>
        </div>
    
);

export default HomePage;