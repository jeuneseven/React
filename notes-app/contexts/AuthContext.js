import { createContext, useContext, useEffect, useState } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        setLoading(true);
        const currentUser = await authService.getCurrentUser();
        if (currentUser?.error) {
            setUser(null)
        } else {
            setUser(currentUser);
        }

        setLoading(false)
    };

    const login = async (email, password) => {
        const loggedInUser = await authService.login(email, password);
        if (loggedInUser?.error) {
            return loggedInUser
        }

        await fetchUser()
        return {success: true}
    };

    const register = async (email, password) => {
        const response = await authService.register(email, password);
        if (response?.error) {
            return response
        }

        return login(email, password) // auto login after register
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
        await fetchUser();
    };

    return (
        <AuthContext.Provider value={{user, login, register, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );  

};

export const useAuth = () => useContext(AuthContext);
