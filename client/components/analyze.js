import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/view-wardens.css';
import Auth from './auth';

const ViewStudents = () => {
    const [students, setStudents] = useState([]);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:3000/analyze');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error.message);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className="viewWardens-container">
            <h1 className="viewWardens-title">View Ratings</h1>
            <ul className="viewWardens-list">
                {students.map((student) => (
                    <li key={student.username} className="viewWardens-item">
                        <strong>Username:</strong> {student.username} 
                        <strong> Room Number:</strong> {student.roomNumber} 
                        <strong> Hostel:</strong> {student.hostel} 
                        <strong> Rating: </strong> {student.rating} 
                    </li>
                ))}
            </ul>
            <Link to="/wardenlogin" className="viewWardens-link">
                Go Back
            </Link>
        </div>
    );
};

export default Auth(ViewStudents, ['warden']);
