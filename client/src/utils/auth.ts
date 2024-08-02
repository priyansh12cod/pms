import api from './api';
import axios, { AxiosError } from 'axios';

export const checkAuth = async () => {
    try {
        const response = await api.get('/user/profile');
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const getTokens = () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    return { accessToken, refreshToken };
};

export const setTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
};

export const clearTokens = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

export const login = async (email: string, password: string) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        const { accessToken, refreshToken } = response.data;
        setTokens(accessToken, refreshToken);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const register = async (name: string, email: string, password: string, confirmPassword: string, userType: string, captcha: string) => {
    try {
        const response = await axios.post('http://localhost:8000/api/auth/register', {
            name,
            email,
            password,
            confirmPassword,
            userType,
            captcha
        }, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        handleError(error);
        throw new Error(`Registration failed: ${getErrorMessage(error)}`);
    }
};

const getErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.message || error.message || 'Unknown Axios error';
    } else if (error instanceof Error) {
        return error.message || 'Unknown error';
    } else {
        return 'Unknown error';
    }
};


export const logout = async () => {
    try {
        await api.get('/auth/logout');
        clearTokens();
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const refreshToken = async () => {
    try {
        const response = await api.get('/auth/refresh');
        const { accessToken } = response.data;
        localStorage.setItem('access_token', accessToken);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

// Helper function to handle errors
const handleError = (error: unknown) => {
    console.error('API request failed:', error);
    console.error('Error message:', getErrorMessage(error));
};




