import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/afterlogin.css'
import leftBackgroundImage from '../maintenance.jpg';
import centerBackgroundImage from '../Sportscomplex.png';
import currentBackgroundImage from '../hostel.jpg';
import rightBackgroundImage from '../sse.jpg';
import Auth from './auth';

const WardenLogin = () => {
    const [hoveredButton, setHoveredButton] = useState('');
    const username = localStorage.getItem('loggedinusername');

    const handleHover = (button) => {
        setHoveredButton(button);

        if (button === 'left') {
            document.body.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0.65), rgba(39, 39, 39, 0.65)), url(${leftBackgroundImage}) center center fixed`;
            document.body.style.backgroundSize = 'cover';
        }
        else if (button === 'center') {
            document.body.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0.65), rgba(39, 39, 39, 0.65)), url(${centerBackgroundImage}) center center fixed`;
            document.body.style.backgroundSize = 'cover';
        }
        else if (button === 'right') {
            document.body.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0.65), rgba(39, 39, 39, 0.65)), url(${rightBackgroundImage}) center center fixed`;
            document.body.style.backgroundSize = 'cover';
        }
        else {
            document.body.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0.65), rgba(39, 39, 39, 0.65)), url(${currentBackgroundImage}) center center fixed`;
            document.body.style.backgroundSize = "cover";
        }
    };

    const logout = () => {
        localStorage.clear();
        localStorage.removeItem('auth');
        window.location.href = '/';
    };

    return (
        <div>
            <div className="navbar">
                <div className="logout">
                    <Link to="/login" onClick={logout}>Logout</Link>
                </div>
            </div>

            <div className="about-section">
                <h1>Welcome, {username} !</h1>
                <h2>What Do You Plan To Do?</h2>
                <div className="options-container">
                    <Link to="/updateroom" className="big-button left" onMouseEnter={() => handleHover('left')} onMouseLeave={() => handleHover('')}>
                        Update Room Information
                    </Link>
                    <Link to="/view-complaints" className="big-button left" onMouseEnter={() => handleHover('left')} onMouseLeave={() => handleHover('')}>
                        View Pending Maintenance Requests
                    </Link>
                    <Link to="/analyze" className="big-button center" onMouseEnter={() => handleHover('center')} onMouseLeave={() => handleHover('')}>
                        Analyze Facility Satisfaction
                    </Link>
                    <Link to="/view-feedback" className="big-button right" onMouseEnter={() => handleHover('right')} onMouseLeave={() => handleHover('')}>
                        View Student Feedback
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Auth(WardenLogin , ['warden']);