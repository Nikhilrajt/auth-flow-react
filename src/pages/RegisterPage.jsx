import { useState,useRef } from "react";
import AuthInput from "../components/AuthInput";
import { checkUsername, createUser } from "../services/authApi";
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
    const [isLoading, setIsLoading] = useState(false);
    const [usernameStatus, setUsernameStatus] = useState("");
    const usernameCheckRef = useRef(0);
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
    setIsLoading(true);
    try {
        const users = await checkUsername(formData.username);
        if (users.length > 0) {
            setErrors((prev) => ({
                ...prev,
                username: "Username already exists",
            }));
            return;
        }
        const newUser = {
            ...formData,
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
            createdAt: new Date().toISOString()
        }
        const user = await createUser(newUser);
        console.log("User created", user);
    }
    catch {
        setErrors((prev) => ({
            ...prev,
            form: "Something went wrong. Please try again.",
        }));
    } finally {
        setIsLoading(false);
    }
};
return (
    <div className="min-h-screen bg-gray-400 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-gray-300 rounded-xl border border-gray-400 shadow-md p-8">

            <div className="text-center mb-7">
                <h1 className="text-3xl font-semibold text-gray-900">
                    Create Account
                </h1>

                <p className="text-sm text-gray-700 mt-2">
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
                    {isLoading ? "Creating Account..." : "Create Account"}
                </button>

            </form>

            <p className="text-center text-sm text-gray-700 mt-6">
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