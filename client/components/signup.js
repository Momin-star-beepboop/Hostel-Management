import React, { useState } from 'react';
import axios from 'axios';
import '../styles/signup.css'
import { Link } from 'react-router-dom'

const Signup = (prop) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student'); 
  const [signupMessage, setSignupMessage] = useState('');

  const handleSignup = async () => {
    const specials = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '{', '}', '[', ']', '|', '\\', ':', ';', '"', '\'', '<', '>', ',', '.', '?', '/', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    if(!specials.some((special) => password.includes(special)) || !nums.some((num) => password.includes(num)) ) {
      setSignupMessage('Password must contain atleast one special character and one number');
      return;
    }

    if(password.length < 8) {
      setSignupMessage('Password must be atleast 8 characters long');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:3000/signup', {
        username: username,
        password: password,
        userType: userType,
        roomNumber: null,
        complaints: [],
        hostel: null,
        feedback: null,
        rating: null,
      });
      console.log(username, password);
      console.log(response.data.message);
      setSignupMessage(response.data.message);
    } catch (error) {
      console.error('Error signing up:', error.message);
      setSignupMessage('Signup failed');
    }
  };

  return (
    <div>
      <div className="navbar">
        <div className="navbar-links">
          <Link to="/">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      </div>

      <div className="login-page">
        <div className="login-header">
          Signup for Hostel Management <span className="lib-name">System</span>
        </div>
        <div className="partition"></div>
        <form className="form">
          <div>
            <input
              className="user-inp"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              className="pass-inp"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="userType" className="usertype">Select User Type:</label>
            <select
              id="userType"
              name="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="warden">Warden</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <button className="sub-button" type="button" onClick={handleSignup}>
              Signup
            </button>
          </div>
          <div className="signup-message">
            {signupMessage && <p>{signupMessage}</p>}
          </div>
        </form>
        <div className="question">
          Already have an account?{' '}
          <Link to="/login" className="sub-button1">
            Login
          </Link>{' '}
        </div>
      </div>
    </div>
  );
};

export default Signup;
