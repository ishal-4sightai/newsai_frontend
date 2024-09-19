import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';  // Import the global styles

const ForgotPassword = () => {
    const [userID, setUserID] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/auth_users/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ UserID: userID })
            });

            if (response.ok) {
                setMessage('Password reset email sent');
                // Navigate to the reset password page after successful request
                navigate('/reset-password');
            } else {
                const errorData = await response.json();
                setError(errorData.detail || 'Something went wrong');
            }
        } catch (error) {
            setError('An unexpected error occurred');
        }
    };

    return (
        <div className="auth-container">
            <h2>Forgot Password</h2>
            {error && <p className="error">{error}</p>}
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="userID">UserID:</label>
                <input
                    type="text"
                    id="userID"
                    value={userID}
                    onChange={(e) => setUserID(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
