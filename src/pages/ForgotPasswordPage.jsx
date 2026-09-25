import { useState } from "react";
import { validateEmail } from "../utils/validation";
import { getUserByEmail } from "../services/authApi";
function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
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
        <div>
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={handleChange}
                />

                {error && (
                    <p>{error}</p>
                )}

                <button type="submit">
                    Reset Password
                </button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
}

export default ForgotPasswordPage;