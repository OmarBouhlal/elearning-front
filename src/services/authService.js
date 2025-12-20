import api from './api';
import { jwtDecode } from "jwt-decode";

const authService = {
    login: async (credentials) => {
        const response = await api.post('/auth/signin', credentials);
        if (response.data) {
            localStorage.setItem('token', response.data);
        }
        return response.data;
    },

    register: async (userData) => {
        const response = await api.post('/auth/signup', userData);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        // Any other cleanup
    },

    getCurrentUser: () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // Return the decoded token which contains user info (sub, role, etc)
                // We also attach the raw token if needed
                return { ...decoded, token };
            } catch (error) {
                console.error("Invalid token", error);
                localStorage.removeItem('token');
                return null;
            }
        }
        return null;
    },

    getUserRole: () => {
        const user = authService.getCurrentUser();
        return user?.role || null;
    }
};

export default authService;
