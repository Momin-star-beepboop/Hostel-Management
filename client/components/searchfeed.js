import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/search-results.css';
import Auth from './auth';

const SearchFeed = () => {
    const searchTerm = localStorage.getItem('search');
    const [students, setStudents] = useState([]);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:3000/view-students');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error.message);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className="searchResults-container">
            <h1 className="fonto">Search Results</h1>
            <p className="fonto">Results for: {searchTerm}</p>
            {students.map((student) => {
                console.log(searchTerm);
                if (student.username === searchTerm) {
                    return (
                        <div className="listy">
                            {student.username} {student.roomNumber} {student.hostel} {student.feedback}
                        </div>
                    );
                }
                return null;
            })}
            <Link to="/wardenlogin" className="searchResults-link">
                Go Back
            </Link>
        </div>
    );

};

export default Auth(SearchFeed, ['warden']);
