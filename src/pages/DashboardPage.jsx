import { useContext } from "react";
import AuthContext from "../contexts/AuthContextDefinition";

function DashboardPage() {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="min-h-screen bg-gray-400 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md bg-gray-300 rounded-xl border border-gray-400 shadow-md p-8">

                <div className="text-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-900">
                        Welcome, {user?.fullName}
                    </h1>

                    <p className="text-sm text-gray-700 mt-2">
                        Your profile
                    </p>
                </div>

                <div className="flex flex-col items-center mb-6">

                    <img
                        src={user?.avatar}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-400 mb-4"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        className="w-full text-sm text-gray-700"
                    />

                </div>

                <div className="space-y-4 text-gray-800">

                    <div>
                        <p className="text-sm font-medium">
                            Username
                        </p>
                        <p>{user?.username}</p>
                    </div>

                    <div>
                        <p className="text-sm font-medium">
                            Email
                        </p>
                        <p>{user?.email}</p>
                    </div>

                    <div>
                        <p className="text-sm font-medium">
                            Full Name
                        </p>
                        <p>{user?.fullName}</p>
                    </div>

                </div>

                <button
                    onClick={logout}
                    className="w-full mt-7 bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 rounded-lg transition"
                >
                    Logout
                </button>

            </div>
        </div>
    );
}

export default DashboardPage;