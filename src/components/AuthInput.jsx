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
    return (
        <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="w-full bg-gray-200 border border-gray-400 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-600 outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-500"
            />

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