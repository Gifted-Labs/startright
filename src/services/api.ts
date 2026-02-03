import axios from 'axios';

// Backend is running on port 9000 based on context
const API_BASE_URL = 'https://api.merbsconnect.com/api/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Add response interceptor for global error handling if needed
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global errors (e.g. 401, 500)
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
