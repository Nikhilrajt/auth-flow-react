import { useState } from "react";
function AuthInput({
    label,
    name,
    type = "text",
    value,
    placeholder,
    onChange,
    error,
    status
})
 {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
                {label}
            </label>

            <input
                type={type === "password" && showPassword ? "text" : type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="w-full bg-gray-200 border border-gray-400 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-600 outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-500"
            />
            {type === "password" && (
    <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="text-sm text-gray-700 mt-1 hover:underline"
    >
        {showPassword ? "Hide password" : "Show password"}
    </button>
)}

            {error ? (
                <p className="text-red-600 text-sm mt-1">
                    {error}
                </p>
            ) : status === "checking" ? (
                <p className="text-gray-600 text-sm mt-1">
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