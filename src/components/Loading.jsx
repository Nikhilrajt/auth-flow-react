function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-400">
            <div className="text-center">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin mx-auto"></div>

                <p className="mt-4 text-gray-800 font-medium">
                    Loading...
                </p>
            </div>
        </div>
    );
}

export default Loading;