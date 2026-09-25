import { useState, useRef, useContext } from "react";
import AuthContext from "../contexts/AuthContextDefinition";
import AuthInput from "../components/AuthInput";
import { checkUsername } from "../services/authApi";
import ThemeContext from "../contexts/ThemeContextDefinition"
import {
    validateFullName,
    validatePassword,
    validateUsername,
    validateEmail
} from "../utils/validation";

function RegisterPage() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        fullName: ""
    });
    const [errors, setErrors] = useState({});
    const [usernameStatus, setUsernameStatus] = useState("");
    const usernameCheckRef = useRef(0);
    const { register, isLoading } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const handleChange = async (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        let error = "";

        if (name === "username") {
            const checkId = ++usernameCheckRef.current;

            error = validateUsername(value);

            if (error) {
                setUsernameStatus("");
            } else {
                setUsernameStatus("checking");

                const users = await checkUsername(value);

                if (checkId !== usernameCheckRef.current) {
                    return;
                }

                if (users.length > 0) {
                    error = "Username already exists";
                    setUsernameStatus("taken");
                } else {
                    setUsernameStatus("available");
                }
            }
        }

        if (name === "email") {
            error = validateEmail(value);
        }

        if (name === "password") {
            error = validatePassword(value);
        }

        if (name === "fullName") {
            error = validateFullName(value);
        }

        setErrors((prev) => ({
            ...prev,
            [name]: error
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();


        const usernameError = validateUsername(formData.username);
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);
        const fullNameError = validateFullName(formData.fullName);
        setErrors({
            username: usernameError,
            email: emailError,
            password: passwordError,
            fullName: fullNameError,
        });

        if (usernameError || emailError || passwordError || fullNameError) {
            return;
        }
        try {
            const user = await register(formData);

            console.log("User created", user);
        } catch (error) {
            console.error("Registration error:", error);

            setErrors((prev) => ({
                ...prev,
                username: error.message
            }));
        }
    }
    return (
        <div
            className={`min-h-screen flex items-center justify-center px-4 py-8 ${theme === "dark" ? "bg-[#1e1e1e]" : "bg-gray-400"
                }`}
        >
            <div
                className={`w-full max-w-md rounded-xl border shadow-md p-8 ${theme === "dark"
                    ? "bg-[#252526] border-[#3e3e42] text-white"
                    : "bg-gray-300 border-gray-400 text-gray-900"
                    }`}
            >

                <div className="text-center mb-7">
                    <h1
                        className={`text-3xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"
                            }`}
                    >
                        Create Account
                    </h1>

                    <p
                        className={`text-sm mt-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                            }`}
                    >
                        Create an account to get started
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <AuthInput
                        label="Username"
                        name="username"
                        value={formData.username}
                        placeholder="Enter username"
                        onChange={handleChange}
                        error={errors.username}
                        status={usernameStatus}
                    />

                    <AuthInput
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        placeholder="Enter email"
                        onChange={handleChange}
                        error={errors.email}
                    />

                    <AuthInput
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        placeholder="Enter password"
                        onChange={handleChange}
                        error={errors.password}
                    />

                    <AuthInput
                        label="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        placeholder="Enter full name"
                        onChange={handleChange}
                        error={errors.fullName}
                    />
                    {errors.form && (
                        <p className="text-red-600 text-sm text-center">
                            {errors.form}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 rounded-lg transition"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-gray-300 border-t-white rounded-full animate-spin"></span>
                                Creating Account...
                            </span>
                        ) : (
                            "Create Account"
                        )}
                    </button>

                </form>
                <button
                    type="button"
                    onClick={toggleTheme}
                    className="w-full mt-4 bg-gray-700 hover:bg-gray-800 text-white font-medium py-3 rounded-lg"
                >
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                </button>
                <p
                    className={`text-center text-sm mt-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                >
                    Already have an account?{" "}
                    <span className="text-gray-900 font-medium cursor-pointer hover:underline">
                        Login
                    </span>
                </p>

            </div>
        </div>
    );
}
export default RegisterPage;