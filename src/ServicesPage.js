import React from 'react';
import repoImage from './assets/repo.png';
import workImage from './assets/work.png';
import docImage from './assets/doc.png'

import './ServicesPage.css';

const ServicesPage = () => {

return (

    <div className="service-container">
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
                        <a href="/">Home</a>
                    </li>
                <li className="nav-item">
                    <a href="/signup">Sign Up</a>
                </li>
                <li className="nav-item">
                    <a href="/login">Sign In</a>
                </li>
                
            </ul>
        </nav>
        <div className="services-content">
            <h2 className="services-heading">Our Services</h2>
            <div className="services-container">
                <div className="service-box">
                    <img className="services-image" src={repoImage} alt="repo"/>
                    <div className="service-box-content">
                        <h3>CONTRACT REPOSITORY</h3>
                            <p>
                            Effortlessly organize and locate crucial contract information with advanced search and filtering capabilities.
                            </p>       
                    </div>
                </div>
                <div className="service-box">
                    <img className="services-image" src={workImage} alt="work" />
                    <div className="service-box-content">
                        <h3>AUTOMATED WORKFLOW </h3>
                            <p>
                            From creation to review, approvals and renewals, our system automates and tracks every step, reducing errors and enhancing efficiency.
                            </p> 
                    </div>
                </div>
                <div className="service-box">
                    <img className="services-image" src={docImage} alt="doc" />
                    <div className="service-box-content">
                        <h3>DOCUMENT COLLABORATION</h3>
                            <p>
                            Real-time editing, version control,and commenting on contract documents empower seamless communication and boost team productivity.
                            </p>                       
                    </div>
                </div>
            </div>
                <img className="service-image"
                    src="https://www.razor365.com/lp/images/solution-lp/Quick-Flow_Desktop-view.webp"
                    alt="Services"
                />
            </div>
        </div>
    );
};

export default ServicesPage;