import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true // If you're sending cookies or authentication headers
});

// Helper function to handle errors
const handleError = (error: unknown) => {
    console.error('API request failed:', error);
    if (axios.isAxiosError(error)) {
        // The error is an AxiosError
        console.error('Response error status:', error.response?.status);
        console.error('Response error data:', error.response?.data);
    } else if (error instanceof Error) {
        // The error is a native Error
        console.error('Error message:', error.message);
    } else {
        console.error('Unexpected error:', error);
    }
    throw error; // Rethrow the error to handle it in the UI or other parts
};

// Existing functions with improved error handling
export const get = async (url: string) => {
    try {
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const post = async (url: string, data: any) => {
    try {
        const response = await api.post(url, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const put = async (url: string, data: any) => {
    try {
        const response = await api.put(url, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const del = async (url: string) => {
    try {
        const response = await api.delete(url);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Function to get all projects
export const getProjects = async () => {
    return get('/projects'); // Use generic GET function
};

// Function to get a project by ID
export const getProjectById = async (id: string) => {
    return get(`/projects/${id}`); // Use generic GET function
};

// Function to register a new user
export const registerUser = async (email: string, password: string, name: string) => {
    return post('/auth/register', { email, password, name }); // Use generic POST function
};

// Function to log in a user
export const loginUser = async (email: string, password: string) => {
    return post('/auth/login', { email, password }); // Use generic POST function
};

// Function to log out a user
export const logoutUser = async () => {
    return get('/auth/logout'); // Use generic GET function
};

// Function to get user profile
export const getUserProfile = async () => {
    return get('/user/profile'); // Use generic GET function
};

// Function to update user profile
export const updateUserProfile = async (profileData: any) => {
    return put('/user/profile', profileData); // Use generic PUT function
};

// Function to change user password
export const changePassword = async (currentPassword: string, newPassword: string) => {
    return put('/user/password', { currentPassword, newPassword }); // Use generic PUT function
};

// Function to get all users (admin only)
export const getAllUsers = async () => {
    return get('/admin/users'); // Use generic GET function
};

// Function to update user role (admin only)
export const updateUserRole = async (userId: string, role: string) => {
    return put(`/admin/user/${userId}/role`, { role }); // Use generic PUT function
};

// Function to delete a user (admin only)
export const deleteUser = async (userId: string) => {
    return del(`/admin/user/${userId}`); // Use generic DELETE function
};

// Function to update a user project (admin only)
export const updateUserProject = async (userId: string, projectId: string, projectData: any) => {
    return put(`/admin/user/${userId}/project/${projectId}`, projectData); // Use generic PUT function
};

// Function to delete a user project (admin only)
export const deleteUserProject = async (userId: string, projectId: string) => {
    return del(`/admin/user/${userId}/project/${projectId}`); // Use generic DELETE function
};

// Export the axios instance
export default api;
