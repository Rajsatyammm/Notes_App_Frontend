import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";
import ErrorMessage from "../constants/ErrorMessage";
import APIEndpoints from "../constants/APIEndpoints";
import Loader from "../components/Loader";
import { HiEye, HiEyeOff } from 'react-icons/hi'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible); ``
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsPasswordVisible(false);
        try {
            setLoading(true);
            const response = await axios.post(APIEndpoints.USERS_LOGIN, {
                email, password
            });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(ErrorMessage.ERROR_INVALID_CREDENTIALS);
        }
        setLoading(false);
    };

    return (loading ? <Loader /> :
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={
                                (e) => setEmail(e.target.value)
                            }
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative mt-2">
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded pr-10" // pr-10 for padding on the right to make space for the icon
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600" // Position the icon
                            >
                                {isPasswordVisible ? <HiEyeOff className="w-6 h-6" /> : <HiEye className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">Login</button>
                </form>
                <div className="mt-4 text-center">
                    <p>
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-500 hover:text-blue-700">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
