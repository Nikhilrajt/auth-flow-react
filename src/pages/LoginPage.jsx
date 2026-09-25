import { useContext, useState } from "react";
import AuthInput from "../components/AuthInput";
import AuthContext from "../contexts/AuthContextDefinition";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ThemeContext from "../contexts/ThemeContextDefinition";
import {
    validateEmail,
    validatePassword
} from "../utils/validation";

function LoginPage() {
    const navigate = useNavigate();
    const { login, isLoading } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [rememberMe, setRememberMe] = useState(false);

    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        let error = "";

        if (name === "email") {
            error = validateEmail(value);
        }

        if (name === "password") {
            error = validatePassword(value);
        }

        setErrors((prev) => ({
            ...prev,
            [name]: error
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);

        setErrors({
            email: emailError,
            password: passwordError,
            form: ""
        });

        if (emailError || passwordError) {
            return;
        }
        try {
            await login({
                email: formData.email,
                password: formData.password,
                rememberMe
            });

            toast.success("Login successful");
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.message);
            setErrors((prev) => ({
                ...prev,
                form: error.message
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
                        Welcome Back
                    </h1>

                    <p
                        className={`text-sm mt-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                            }`}
                    >
                        Login to your account
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

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
                    <Link
                        to="/forgot-password"
                        className={`text-sm font-medium hover:underline ${theme === "dark" ? "text-gray-300" : "text-gray-900"
                            }`}
                    >
                        Forgot password?
                    </Link>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />

                        <label className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                            }`}>
                            Remember me
                        </label>
                    </div>
                    {errors.form && (
                        <p className="text-red-600 text-sm text-center">
                            {errors.form}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 rounded-lg transition disabled:opacity-60"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>

                </form>
                <button
                    type="button"
                    onClick={toggleTheme}
                    className="w-full mt-4 bg-gray-700 hover:bg-gray-800 text-white font-medium py-3 rounded-lg"
                >
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                </button>
                <p className={`text-center text-sm mt-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}>
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className={`font-medium hover:underline ${theme === "dark" ? "text-white" : "text-gray-900"
                            }`}
                    >
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default LoginPage;