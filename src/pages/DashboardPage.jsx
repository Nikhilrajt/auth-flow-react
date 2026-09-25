import { useContext } from "react";
import AuthContext from "../contexts/AuthContextDefinition";
import ThemeContext from "../contexts/ThemeContextDefinition";

function DashboardPage() {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div
            className={`min-h-screen flex items-center justify-center px-4 py-8 ${theme === "dark" ? "bg-[#1e1e1e]" : "bg-gray-400"
                }`}
        >
            <div
                className={`w-full max-w-md rounded-xl border shadow-md p-8 ${theme === "dark"
                    ? "bg-[#252526] border-[#3e3e42] text-white"
                    : "bg-gray-300 border-gray-400 text-gray-900"
                    }`}
            >

                <div className="text-center mb-6">
                    <h1
                        className={`text-3xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"
                            }`}
                    >
                        Welcome, {user?.fullName}
                    </h1>

                    <p
                        className={`text-sm mt-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                            }`}
                    >
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
                        className={`w-full text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                            }`}
                    />

                </div>

                <div
                    className={`space-y-4 ${theme === "dark" ? "text-gray-200" : "text-gray-800"
                        }`}
                >

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
                <button
                    onClick={toggleTheme}
                    className="w-full mt-4 bg-gray-700 hover:bg-gray-800 text-white font-medium py-3 rounded-lg"
                >
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                </button>

            </div>
        </div>
    );
}

export default DashboardPage;