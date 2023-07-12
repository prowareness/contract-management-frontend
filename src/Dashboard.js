import React, { useState, useEffect } from 'react';
import UploadFiles from './components/upload-files.component';
import './Dashboard.css';

function Dashboard({ firstName: propFirstName, handleLogout }) {
  const [firstName, setFirstName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const storedFirstName = sessionStorage.getItem('firstName');
    if (userId && storedFirstName) {
      setFirstName(storedFirstName);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('firstName', propFirstName);
    setFirstName(propFirstName);
  }, [propFirstName]);

  const displayName = propFirstName || firstName;
  
    
    return (
        <div className="dashboard-page">
            <nav className="navbar">
                <div className='logo'>
                    <img
                        className="logo-image"
                        src="https://devon.global/wp-content/uploads/2016/12/devon-logo-blue.png"
                        alt="Logo"
                    />
                </div>
                <div className="search-box">
                <input type="text" className='search-input'
                placeholder='Search' value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
                    <i className="fas fa-search search-icon"></i>
                </div>
                
                <ul className="nav-links">
                    <li className="nav-item">
                        <a href="/services">Services</a>
                    </li>
                    <li className="nav-item">
                        <a href="/">Home</a>
                    </li>
                    <li className='nav-item'>
                    <div className='heading-container'>
                <h1 className='heading-text'>{displayName}!!!</h1>
                <img className='heading-icon'
                src='https://th.bing.com/th/id/R.7ea4af7d8401d2b43ee841bfa2abe89d?rik=xidyUKdveUKULQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-download-icons-logos-emojis-users-2240.png&ehk=2%2bOqgdMZqFkKaBclc%2fPL9B86vLju3iBGiFmH64kXaTM%3d&risl=&pid=ImgRaw&r=0'
                alt='Heading icon'
                />
                </div>
                    </li>
                    <li className='nav-item'>
                        <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            </nav>
            <div className="dashboard">
        <div className="dashboard-left">
          <div className="upload-section">
            <UploadFiles searchQuery={searchQuery} />
          </div>
        </div>
        <div className="dashboard-right">
                    <img className='image-icon' 
                    src='https://www.technologyonecorp.co.uk/__data/assets/image/0006/146625/Contract-Management-at-a-glance.png'
                    alt='Contract Management'></img>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;