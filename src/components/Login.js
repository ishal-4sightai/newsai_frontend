// src/components/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'; // Import your CSS file

const Login = () => {
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State to handle error messages
    const [successMessage, setSuccessMessage] = useState(''); // State to handle success message

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous messages
        setSuccessMessage('');
        try {
            const response = await fetch('http://localhost:8000/auth_users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ UserID: userID, Password: password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Login successful'); // Set success message
            } else {
                if (data.detail) {
                    setErrorMessage(data.detail); // Set error message based on response
                } else {
                    setErrorMessage('Login failed. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className="auth-page">
            <header className="auth-header">
                <h2>Login</h2>
            </header>

            <main className="auth-main">
                <div className="auth-container">
                    <form onSubmit={handleLogin}>
                        <label htmlFor="userID">User ID:</label>
                        <input
                            type="text"
                            id="userID"
                            value={userID}
                            onChange={(e) => setUserID(e.target.value)}
                            required
                            placeholder="Enter your User ID"
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                        <button type="submit">Login</button>
                    </form>

                    {/* Success Message Section */}
                    {successMessage && <div className="success-message">{successMessage}</div>}

                    {/* Error Message Section */}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </div>
            </main>

            <footer className="auth-footer">
                <p className="forgot-password">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </p>
            </footer>
        </div>
    );
};

export default Login;
