import { ID } from 'react-native-appwrite';
import { account } from './appwrite';

const authService = {
    async register(email, password) {
        try {
            const response = await account.create(ID.unique(), email, password);
            return response;
        } catch (error) {
            return { error: error.message || 'Registration failed. Please try again.' };
        }
    },

    async login(email, password) { 
        try {
            const response = await account.createEmailPasswordSession(email, password);
            return response;
        } catch (error) {
            return { error: error.message || 'Login failed. Please try again.' };
        }
    },

    async logout() {
        try {
            await account.deleteSession('current');
            return { success: true };
        } catch (error) {
            return { error: error.message || 'Logout failed. Please try again.' };
        }
    },

    async getCurrentUser() {
        try {
            const user = await account.get();
            return user;
        } catch (error) {
            return null; // No user logged in
        }
    }   
};

export default authService;