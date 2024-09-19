// src/api.js
const API_URL = 'http://localhost:8000/auth_users';

export const login = async (userID, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ UserID: userID, Password: password }),
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return await response.json();
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const forgotPassword = async (userID) => {
    try {
        const response = await fetch(`${API_URL}/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ UserID: userID }),
        });
        if (!response.ok) {
            throw new Error('Forgot password request failed');
        }
        return await response.json();
    } catch (error) {
        console.error('Error during forgot password:', error);
        throw error;
    }
};

export const resetPassword = async (userID, token, newPassword) => {
    try {
        const response = await fetch(`${API_URL}/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ UserID: userID, Token: token, NewPassword: newPassword }),
        });
        if (!response.ok) {
            throw new Error('Reset password request failed');
        }
        return await response.json();
    } catch (error) {
        console.error('Error during password reset:', error);
        throw error;
    }
};
