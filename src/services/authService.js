import api from './api';
import { jwtDecode } from "jwt-decode";

const authService = {
    login: async (credentials) => {
        const response = await api.post('/auth/signin', credentials);
        if (response.data) {
            localStorage.setItem('token', response.data.token);
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
        // Check if token exists and is a valid string, not "undefined" or "null" literal strings
        if (token && typeof token === 'string' && token !== "undefined" && token !== "null") {
            // Basic JWT format validation: must have 3 parts separated by dots
            const parts = token.split('.');
            if (parts.length !== 3) {
                console.warn("Invalid token format detected, clearing storage.");
                localStorage.removeItem('token');
                return null;
            }

            try {
                const decoded = jwtDecode(token);
                // Return the decoded token which contains user info (sub, role, etc)
                // We also attach the raw token if needed
                return { ...decoded, token };
            } catch (error) {
                console.error("Token decoding failed", error);
                localStorage.removeItem('token');
                return null;
            }
        }
        // Valid token not found or invalid string
        if (token) {
            // It was something invalid like "undefined" string
            localStorage.removeItem('token');
        }
        return null;
    },

    getUserRole: () => {
        const user = authService.getCurrentUser();
        return user?.role || null;
    }
};

export default authService;
