import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/allotment.css';
import Auth from './auth';

const UpdateRoom = () => {
    const [roomNumber, setRoomNumber] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [hostel, setHostel] = useState('');
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/view-students');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error.message);
                setErrorMessage('Error fetching students. Please try again.');
            }
        };

        fetchStudents();
    }, []);

    const handleUpdateRoom = async () => {
        const nums = ['1', '2', '3', '4', '5', '6', '7'];
        if (!nums.some((num) => hostel.includes(num))) {
            setSuccessMessage('');
            setErrorMessage('Please enter number after M from 1-7');
            return;
        }
        try {
            await axios.put('http://localhost:3000/updateroom', {
                studentId: selectedStudent,
                roomNumber: roomNumber,
                hostel: hostel,
            });
            setErrorMessage('');
            setSuccessMessage('Room information updated successfully');
        } catch (error) {
            if (error.response.data.message === 'Noroom') {
                setSuccessMessage('');
                setErrorMessage('Please enter room');
            }
            else if (error.response.data.message === 'Roomgreaterthan0') {
                setSuccessMessage('');
                setErrorMessage('Please enter room greater than 1');
            }
            if (error.response.data.message === 'Nohostel') {
                setSuccessMessage('');
                setErrorMessage('Please enter hostel');
            }
            else if (error.response.data.message === 'Nom') {
                setSuccessMessage('');
                setErrorMessage('Please enter hostel name starting with M');
            }
            else {
                setSuccessMessage('');
                setErrorMessage('Error allotting room. Please try again.');
                console.error('Error allotting room:', error.message);
            }
        }
    };

    return (
        <div className="room-allotment-container">
            <h1 className="room-allotment-header">Update Room Information</h1>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {students.length === 0 ? (
                <p>No students available. Add students before allotting rooms.</p>
            ) : (
                <div className="select-container">
                    <label className='fonty'>Select Student:</label>
                    <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
                        <option value="" disabled>Select a student</option>
                        {students.map((student) => (
                            <option key={student._id} value={student._id}>
                                {student.username}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className="input-container">
                <label className='fonty'>Enter Room Number:</label>
                <input type="text" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} />
                <label className='fonty'>Enter Hostel:</label>
                <input type="text" value={hostel} onChange={(e) => setHostel(e.target.value)} />
            </div>

            <button className="button-container" onClick={handleUpdateRoom}>
                Update Room Information
            </button>

            {successMessage && <p className="success-message">{successMessage}</p>}

            <Link to="/wardenlogin" className='goback'>Go Back</Link>
        </div>


    );
};

export default Auth(UpdateRoom, ['warden']);
