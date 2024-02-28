import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/complaints.css'; 
import Auth from './auth';

const Feedback = () => {
    const [rating, setRating] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const username = localStorage.getItem('loggedinusername');
    const handleFeedbackChange = (e) => {
        setRating(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/rating', {
                username: username,
                rating: rating,
            });
            console.log('Server Response:', response.data);
            setErrorMessage('');
            setSuccessMessage('Rating submitted successfully');
        } catch (error) {
            console.error('Error submitting Rating:', error.message);
            console.error(error.response.data.message);
            if (error.response.data.message === 1)
            {
                setSuccessMessage('');
                setErrorMessage('Rating cannot be greater than 10 or less than 1');
                return;
            }
            else{
                setSuccessMessage('');
                setErrorMessage('Error submitting rating. Please try again.');
            }
        }
    };

    return (
        <div className="complaint-box">
            <h1>Provide Rating for facility out of 10</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Your Rating:
                    <textarea value={rating} onChange={handleFeedbackChange} />
                </label>
                <button type="submit">Submit Rating</button>
            </form>
            {successMessage && <p style={{ color: 'blue' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <Link to="/afterlogin">Go Back</Link>
        </div>
    );
};

export default Auth(Feedback, ['student']);
