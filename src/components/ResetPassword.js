import React, { useState } from 'react';
import '../styles.css';

const ResetPassword = () => {
    const [userID, setUserID] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/auth_users/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ UserID: userID, Token: token, NewPassword: newPassword })
            });

            if (response.ok) {
                setMessage('Password has been reset successfully');
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
            <h2>Reset Password</h2>
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
                <label htmlFor="token">Reset Token:</label>
                <input
                    type="text"
                    id="token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                />
                <label htmlFor="newPassword">New Password:</label>
                <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
