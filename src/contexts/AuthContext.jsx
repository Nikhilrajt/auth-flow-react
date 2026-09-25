import { useState, useEffect } from "react";
import AuthContext from "./AuthContextDefinition";
import {
    getUserByEmail,
    getUserById,
    checkUsername,
    createUser
} from "../services/authApi";

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(
    () => Boolean(localStorage.getItem("userId"))
);
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
    const register = async (userData) => {
    setIsLoading(true);

    try {
        const users = await checkUsername(userData.username);

        if (users.length > 0) {
            throw new Error("Username already exists");
        }

        const newUser = {
            ...userData,
            avatar:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
            createdAt: new Date().toISOString()
        };

        const user = await createUser(newUser);

        return user;
    } finally {
        setIsLoading(false);
    }
};
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
                register,
                isAuthenticated,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;