import { useContext } from "react";
import AuthContext from "../contexts/AuthContextDefinition";
import { verifyUserEmail } from "../services/authApi";
function VerifyEmailPage() {
    const { user, setUser } = useContext(AuthContext);
    const handleVerify = async () => {
        try {
            const updatedUser = await verifyUserEmail(user.id);
            setUser(updatedUser);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <h1>Verify Your Email</h1>
            <p>Your email has not been verified yet.</p>

            <button onClick={handleVerify}>
                Verify Email
            </button>
        </div>
    );
}

export default VerifyEmailPage;