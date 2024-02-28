import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/view-wardens.css'; 
import Auth from './auth';

const ViewStudents = () => {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:3000/view-feedback');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error.message);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleSearch = (e) => {
        localStorage.setItem('search', search); 
        console.log(search);
    }

    return (
        <div className="viewWardens-container">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by Name"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value) }}
                />
                <Link to={`/search-feed`}>
                    <button onClick={handleSearch}>Search</button>
                </Link>
            </div>
            <h1 className="viewWardens-title">View Feedback</h1>
            <ul className="viewWardens-list">
                {students.map((student) => (
                    <li key={students._id} className="viewWardens-item">
                        Name {student.username} Room {student.roomNumber} Hostel {student.hostel} Feedback {student.feedback} 
                    </li>
                ))}
            </ul>
            <Link to="/wardenlogin" className="viewWardens-link">Go Back</Link>
        </div>
    );
};

export default Auth(ViewStudents, ['warden']);
