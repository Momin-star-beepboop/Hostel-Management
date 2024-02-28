import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/view-wardens.css';
import Auth from './auth';

const ViewRoom = () => {
    const [students, setStudents] = useState([]);
    const username = localStorage.getItem('loggedinusername');
    
    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:3000/view-room', {
                params: { username: username },
            });
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching room:', error.message);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [username]);

    return (
        <div className="viewWardens-container">
            <h1 className="viewWardens-title">Your Room Number</h1>
            <ul className="viewWardens-list">
                {students.username} Room Number: {students.roomNumber} Hostel: {students.hostel}
            </ul>
            <Link to="/afterlogin" className="viewWardens-link">Go Back</Link>
        </div>
    );
};

export default Auth(ViewRoom, ['student']);
