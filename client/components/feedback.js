import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/complaints.css';
import Auth from './auth';

const Feedback = () => {
    const [feedback, setFeedback] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const username = localStorage.getItem('loggedinusername');
    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/feedback', {
                username: username,
                feedback: feedback,
            });
            console.log('Server Response:', response.data);
            setErrorMessage('');
            setSuccessMessage('Feedback submitted successfully');
        } catch (error) {
            if( error.response.data.message === 1)
            {
                setSuccessMessage('');
                setErrorMessage('Feedback cannot be empty');
            }
            else
            {
                setSuccessMessage('');
                setErrorMessage('Error submitting feedback. Please try again.');
            }
        }
    };

    return (
        <div className="complaint-box">
            <h1>Provide Feedback</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Your Feedback:
                    <textarea value={feedback} onChange={handleFeedbackChange} />
                </label>
                <button type="submit">Submit Feedback</button>
            </form>
            {successMessage && <p style={{ color: 'blue' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <Link to="/afterlogin">Go Back</Link>
        </div>
    );
};

export default Auth(Feedback, ['student']);
