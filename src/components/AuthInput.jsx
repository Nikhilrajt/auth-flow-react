import ThemeContext from "../contexts/ThemeContextDefinition";
import { useState, useContext } from "react";
function AuthInput({
    label,
    name,
    type = "text",
    value,
    placeholder,
    onChange,
    error,
    status
}) {
    const [showPassword, setShowPassword] = useState(false);
    const { theme } = useContext(ThemeContext);
    return (
        <div>
            <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-800"
                }`}>
                {label}
            </label>
            <div className="relative">
                <input
                    type={type === "password" && showPassword ? "text" : type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    className={`w-full border rounded-lg px-4 py-3 outline-none ${theme === "dark"
                        ? "bg-[#1e1e1e] border-[#3e3e42] text-white placeholder-gray-400 focus:border-gray-300"
                        : "bg-gray-200 border-gray-400 text-gray-900 placeholder-gray-600 focus:border-gray-700"
                        }`}
                />
                {type === "password" && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme === "dark" ? "text-gray-200" : "text-gray-600"
                            }`}
                    >
                        {showPassword ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 12s3.75-6 9.75-6 9.75 6 9.75 6-3.75 6-9.75 6-9.75-6-9.75-6Z"
                                />
                                <circle cx="12" cy="12" r="2.5" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 3l18 18"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.58 10.58a2 2 0 0 0 2.83 2.83"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9.88 5.09A10.5 10.5 0 0 1 12 4.5c6 0 9.75 7.5 9.75 7.5a17.5 17.5 0 0 1-3.02 3.88"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.1 6.1C3.66 8.05 2.25 12 2.25 12s3.75 7.5 9.75 7.5c1.5 0 2.82-.34 3.97-.85"
                                />
                            </svg>
                        )}
                    </button>
                )}
            </div>

            {error ? (
                <p className="text-red-600 text-sm mt-1">
                    {error}
                </p>
            ) : status === "checking" ? (
                <p
                    className={`text-sm mt-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                >
                    Checking username...
                </p>
            ) : status === "available" ? (
                <p className="text-green-700 text-sm mt-1">
                    Username is available
                </p>
            ) : null}
        </div>
    );
}

export default AuthInput;