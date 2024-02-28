import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/view-wardens.css';
import Auth from './auth';

const ViewStudents = () => {
    const [students, setStudents] = useState([]);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:3000/view-complaints');
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
            <h1 className="viewWardens-title">View Pending Maintenenace Requests</h1>
            <ul className="viewWardens-list">
                {students.map((student) => (
                    <li key={student.username} className="viewWardens-item">
                        <strong>Username:</strong> {student.username}, 
                        <strong> Room Number:</strong> {student.roomNumber}, 
                        <strong> Hostel:</strong> {student.hostel}, 
                        <div>
                        <strong> Requests:</strong>
                        <ul className="viewWardens-item">
                            {student.complaints.map((complaint, index) => (
                                <li key={index}>{complaint}</li>
                            ))}
                        </ul>
                        </div>
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
