import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/afterlogin.css'
import axios from 'axios';
import leftBackgroundImage from '../hostel-private.jpg';
import centerBackgroundImage from '../center.jpg';
import currentBackgroundImage from '../hostel.jpg';
import rightBackgroundImage from '../right.jpg';
import Auth from './auth';

const AfterLogin = () => {
    const [hoveredButton, setHoveredButton] = useState('');
    const [roomInfo, setRoomInfo] = useState([]);
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

    const fetchRoom = async () => {
        try {
            const response = await axios.get('http://localhost:3000/view-room');
            setRoomInfo(response.data);
        } catch (error) {
            console.error('Error fetching Room:', error.message);
        }
    };

    useEffect(() => {
        fetchRoom();
    }, []);

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
                    <Link to="/view-room" className="big-button left" onMouseEnter={() => handleHover('left')} onMouseLeave={() => handleHover('')}>
                        View Room
                    </Link>
                    <Link to="/complaints" className="big-button center" onMouseEnter={() => handleHover('center')} onMouseLeave={() => handleHover('')}>
                        File a Complaint
                    </Link>
                    <Link to="/feedback" className="big-button right" onMouseEnter={() => handleHover('right')} onMouseLeave={() => handleHover('')}>
                        Provide feedback on your assigned warden
                    </Link>
                    <Link to="/rating" className="big-button right" onMouseEnter={() => handleHover('center')} onMouseLeave={() => handleHover('')}>
                        Provide Rating on your hostel
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Auth(AfterLogin, ['student']);