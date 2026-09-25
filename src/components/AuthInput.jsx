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
                    className={`text-sm mt-1 hover:underline ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                >
                    {showPassword ? "Hide password" : "Show password"}
                </button>
            )}

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