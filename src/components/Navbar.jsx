import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "./Loader"

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(token);
    });

    const handleLogout = () => {
        setLoading(true);
        setTimeout(() => {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            navigate('/login');
            setLoading(false);
        }, 1000)
    };

    return (
        loading ? <Loader /> :
            <nav className="bg-blue-500 p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="text-white text-xl font-semibold">
                        <Link to="/">NotesApp</Link>
                    </div>
                    <div className="flex space-x-6">
                        {isLoggedIn ? (
                            <>
                                <Link to="/dashboard" className="text-white hover:text-gray-200">Dashboard</Link>
                                <Link to="/profile" className="text-white hover:text-gray-200">Profile</Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-white hover:text-gray-200"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
                                <Link to="/signup" className="text-white hover:text-gray-200">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
    );
};

export default Navbar;
