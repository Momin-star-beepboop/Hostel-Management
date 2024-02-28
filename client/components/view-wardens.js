import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/view-wardens.css';
import Auth from './auth';

const ViewWardens = () => {
    const [wardens, setWardens] = useState([]);

    const fetchWardens = async () => {
        try {
            const response = await axios.get('http://localhost:3000/view-wardens');
            setWardens(response.data);
        } catch (error) {
            console.error('Error fetching wardens:', error.message);
        }
    };

    useEffect(() => {
        fetchWardens();
    }, []);

    return (
        <div className="viewWardens-container">
            <h1 className="viewWardens-title">View Wardens</h1>
            <ul className="viewWardens-list">
                {wardens.map((warden) => (
                    <li key={warden._id} className="viewWardens-item">
                        Warden {warden.username}
                    </li>
                ))}
            </ul>
            <Link to="/adminlogin" className="viewWardens-link">Go Back</Link>
        </div>
    );
};

export default Auth(ViewWardens, ['admin']);
