import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContextDefinition";
import ThemeContext from "../contexts/ThemeContextDefinition";
import { verifyUserEmail } from "../services/authApi";
function VerifyEmailPage() {
    const { user, setUser } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const [isVerifying, setIsVerifying] = useState(false);
    const handleVerify = async () => {
        setIsVerifying(true);

        try {
            const updatedUser = await verifyUserEmail(user.id);
            setUser(updatedUser);
        } catch (error) {
            console.error(error);
        } finally {
            setIsVerifying(false);
        }
    };
    return (
        <div
            className={`min-h-screen flex items-center justify-center px-4 py-8 ${theme === "dark" ? "bg-[#1e1e1e]" : "bg-gray-400"
                }`}
        >
            <div
                className={`w-full max-w-md rounded-xl border shadow-md p-8 text-center ${theme === "dark"
                        ? "bg-[#252526] border-[#3e3e42] text-white"
                        : "bg-gray-300 border-gray-400 text-gray-900"
                    }`}
            >
                <h1
                    className={`text-3xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                >
                    Verify Your Email
                </h1>

                {user?.emailVerified ? (
                    <p className="text-green-600 font-medium">
                        ✓ Your email has been verified successfully.
                    </p>
                ) : (
                    <p className="text-red-600">
                        Your email has not been verified yet.
                    </p>
                )}
                <button
                    onClick={handleVerify}
                    disabled={isVerifying || user?.emailVerified}
                >
                    {isVerifying
                        ? "Verifying..."
                        : user?.emailVerified
                            ? "✓ Email Verified"
                            : "Verify Email"}
                </button>
            </div>
        </div>
    );
}
export default VerifyEmailPage;