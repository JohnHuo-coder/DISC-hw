import { useState, useEffect, useContext, createContext } from "react";

export const UserContext = createContext({
    user: null,
    loading: true,
    logOut: () => {},
    refreshAuth: () => {} 
});


export const useAuth = () => useContext(UserContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_URL;

    const checkInitialUser = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/auth/me`, {
                method: "GET",
                credentials: "include"
            });
            if (res.ok){
                const currentUser = await res.json();
                setUser(currentUser);
            }
            else{
                setUser(null);
            }
        } catch (error) {
            console.error("Initial user check failed:", error);
            setUser(null); 
        } finally {
            setLoading(false); 
        }
    };
    const refreshAuth = () => {
        checkInitialUser();
    };

    useEffect(() => {
        checkInitialUser();
    }, []); 

    const logOut = async () => {
        
        try {
            const res = await fetch(`${API_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include"
            });

            if (res.ok) {
                console.log("Backend cookies cleared successfully. Refreshing auth state...");
            } else {
                console.error("Logout API failed, forcing refresh:", res.status);
            }
        } catch (error) {
            console.error("Network error during logout:", error);
        }
        refreshAuth();
    }

    const contextValue = {
        user,
        loading,
        refreshAuth,
        logOut
    };
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}