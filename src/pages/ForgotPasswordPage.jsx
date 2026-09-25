import { useState, useContext } from "react";
import { validateEmail } from "../utils/validation";
import { getUserByEmail } from "../services/authApi";
import ThemeContext from "../contexts/ThemeContextDefinition";
import { Link } from "react-router-dom";
function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const { theme } = useContext(ThemeContext);
    const handleChange = (e) => {
        const value = e.target.value;

        setEmail(value);
        setError(validateEmail(value));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailError = validateEmail(email);

        if (emailError) {
            setError(emailError);
            return;
        }

        try {
            const users = await getUserByEmail(email);

            if (users.length === 0) {
                setMessage("No account found with this email");
                return;
            }

            setMessage("Password reset link sent successfully");
        } catch {
            setMessage("Something went wrong. Please try again.");
        }
    };
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
                        className={`text-3xl font-semibold ${theme === "dark"
                                ? "text-white"
                                : "text-gray-900"
                            }`}
                    >
                        Forgot Password
                    </h1>

                    <p
                        className={`text-sm mt-2 ${theme === "dark"
                                ? "text-gray-300"
                                : "text-gray-700"
                            }`}
                    >
                        Enter your email to reset your password
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            className={`block text-sm font-medium mb-2 ${theme === "dark"
                                    ? "text-gray-200"
                                    : "text-gray-800"
                                }`}
                        >
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={handleChange}
                            className={`w-full border rounded-lg px-4 py-3 outline-none ${theme === "dark"
                                    ? "bg-[#1e1e1e] border-[#3e3e42] text-white placeholder-gray-400 focus:border-gray-300"
                                    : "bg-gray-200 border-gray-400 text-gray-900 placeholder-gray-600 focus:border-gray-700"
                                }`}
                        />

                        {error && (
                            <p className="text-red-600 text-sm mt-1">
                                {error}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 rounded-lg transition"
                    >
                        Reset Password
                    </button>

                    {message && (
                        <p
                            className={`text-sm text-center ${message.includes("successfully")
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                        >
                            {message}
                        </p>
                    )}
                </form>

                <p
                    className={`text-center text-sm mt-6 ${theme === "dark"
                            ? "text-gray-300"
                            : "text-gray-700"
                        }`}
                >
                    Remember your password?{" "}
                    <Link
                        to="/login"
                        className={`font-medium hover:underline ${theme === "dark"
                                ? "text-white"
                                : "text-gray-900"
                            }`}
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
export default ForgotPasswordPage;