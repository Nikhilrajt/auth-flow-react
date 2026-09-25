import { useState, useEffect } from "react";
import AuthContext from "./AuthContextDefinition";
import { getUserByEmail, getUserById } from "../services/authApi";

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            return;
        }

        const restoreUser = async () => {
            setIsLoading(true);

            try {
                const user = await getUserById(userId);
                setUser(user);
            } catch {
                localStorage.removeItem("userId");
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        restoreUser();
    }, []);

    const login = async (credentials) => {
        setIsLoading(true);

        try {
            const users = await getUserByEmail(credentials.email);

            if (users.length === 0) {
                throw new Error("Invalid email or password");
            }

            const user = users[0];

            if (user.password !== credentials.password) {
                throw new Error("Invalid email or password");
            }

            localStorage.setItem("userId", user.id);
            setUser(user);

            return user;
        } finally {
            setIsLoading(false);
        }
    };
    const isAuthenticated = () => {
        return !!user;
    };
    const logout = () => {
    localStorage.removeItem("userId");
    setUser(null);
};

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isLoading,
                setIsLoading,
                login,
                isAuthenticated,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;