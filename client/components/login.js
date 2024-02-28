import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (userType) => {
        try {
            const response = await axios.post('http://localhost:3000/login', {
                username: username,
                password: password,
                userType: userType,
            });
            
            console.log(response);
            setLoginMessage(response.data.message);

            if (response.data.message === 'Login successful') {
                setIsLoggedIn(true);
                localStorage.setItem('loggedinusername', username);
                localStorage.setItem('auth', response.data.token);
                localStorage.setItem('userType', userType);

                if (userType === 'warden') {
                    navigate('/wardenlogin');
                } else if (userType === 'student') {
                    navigate('/afterlogin');
                } else if (userType === 'admin') {
                    navigate('/adminlogin');
                }
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('Error logging in:', error.message);
            setLoginMessage('Login failed. Please check your credentials.');
            setIsLoggedIn(false);
        }
    };

    return (
        <div>
            <div className="navbar">
                <div className="navbar-links">
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </div>
            </div>

            <div className="login-page">
                <div className="login-header">
                    Hostel Management <span className="lib-name">System</span>
                </div>
                <div className='partition'></div>
                <form className='form' >
                    <div>
                        <input
                            className="user-inp"
                            type='text'
                            placeholder='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            className="pass-inp"
                            type='password'
                            placeholder='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="sub-button" type="button" onClick={() => handleLogin('warden')}>
                            Warden Login
                        </button>
                        <button className="sub-button" type="button" onClick={() => handleLogin('student')}>
                            Student Login
                        </button>
                        <button className="sub-button" type="button" onClick={() => handleLogin('admin')}>
                            Admin Login
                        </button>
                    </div>
                </form>
                <div className="login-message">
                    {loginMessage && <p>{loginMessage}</p>}
                </div>
                <div className="question">
                    Don't have an account? <Link to="/signup" className="sub-button1">Signup</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;