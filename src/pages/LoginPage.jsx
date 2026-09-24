import { useContext, useState } from "react";
import AuthInput from "../components/AuthInput";
import AuthContext from "../contexts/AuthContextDefinition";
import {
    validateEmail,
    validatePassword
} from "../utils/validation";

function LoginPage() {
    const { login, isLoading } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

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
                password: formData.password
            });

            console.log("Login successful");
        } catch (error) {
            setErrors((prev) => ({
                ...prev,
                form: error.message
            }));
        }
    }

    return (
        <div className="min-h-screen bg-gray-400 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md bg-gray-300 rounded-xl border border-gray-400 shadow-md p-8">

                <div className="text-center mb-7">
                    <h1 className="text-3xl font-semibold text-gray-900">
                        Welcome Back
                    </h1>

                    <p className="text-sm text-gray-700 mt-2">
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

                <p className="text-center text-sm text-gray-700 mt-6">
                    Don't have an account?{" "}
                    <span className="text-gray-900 font-medium cursor-pointer hover:underline">
                        Register
                    </span>
                </p>

            </div>
        </div>
    );
}

export default LoginPage;