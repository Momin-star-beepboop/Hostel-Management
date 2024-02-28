import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/afterlogin.css'
import leftBackgroundImage from '../maintenance.jpg';
import centerBackgroundImage from '../Sportscomplex.png';
import currentBackgroundImage from '../hostel.jpg';
import rightBackgroundImage from '../sse.jpg';
import Auth from './auth';

const AdminLogin = () => {
    const [hoveredButton, setHoveredButton] = useState('');
    const [wardens, setWardens] = useState([]);
    const [students, setStudents] = useState([]);
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

    const fetchWardens = async () => {
        try {
            const response = await axios.get('http://localhost:3000/view-wardens');
            setWardens(response.data);
        } catch (error) {
            console.error('Error fetching wardens:', error.message);
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:3000/view-students');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error.message);
        }
    };

    useEffect(() => {
        fetchWardens();
        fetchStudents();
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
                    <Link
                        to="/allot-rooms"
                        className="big-button left"
                        onMouseEnter={() => handleHover('left')}
                        onMouseLeave={() => handleHover('')}
                    >
                        Allot Rooms
                    </Link>
                    <Link
                        to="/view-wardens"
                        className="big-button center"
                        onMouseEnter={() => handleHover('center')}
                        onMouseLeave={() => handleHover('')}
                    >
                        View Wardens
                    </Link>
                    <Link
                        to="/view-students"
                        className="big-button right"
                        onMouseEnter={() => handleHover('right')}
                        onMouseLeave={() => handleHover('')}
                    >
                        View Student Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Auth(AdminLogin, ['admin']);