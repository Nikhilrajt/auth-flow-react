import { useState } from "react";
import AuthContext from "./AuthContextDefinition";
import { getUserByEmail } from "../services/authApi";

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isLoading,
                setIsLoading,
                login
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;