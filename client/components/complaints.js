import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/complaints.css'; 
import Auth from './auth';

const Complaint = () => {
    const [complaint, setComplaint] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const username = localStorage.getItem('loggedinusername');

    const handleComplaintChange = (e) => {
        setComplaint(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/complaints', {
                username: username,
                complaint: complaint,
            });
            console.log('Server Response:', response.data);
            setErrorMessage('');
            setSuccessMessage('Complaint filed successfully');
        } catch (error) {
            if( error.response.data.message === 1)
            {
                setSuccessMessage('');
                setErrorMessage('Complaint cannot be empty');
            }
            else
            {
                console.error('Error filing complaint:', error.message);
                setErrorMessage('Error filing complaint. Please try again.');
            }
        }
    };

    return (
        <div className="complaint-box">
            <h1>File a Complaint</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Your Complaint:
                    <textarea value={complaint} onChange={handleComplaintChange} />
                </label>
                <button type="submit">Submit Complaint</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <Link to="/afterlogin" className="go-back-link">Go Back</Link>
        </div>
    );
};

export default Auth(Complaint, ['student']);