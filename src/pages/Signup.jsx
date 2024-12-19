import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";
import ErrorMessage from "../constants/ErrorMessage";
import APIEndpoints from "../constants/APIEndpoints";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            setError(ErrorMessage.ERROR_ALL_FIELDS_ARE_REQUIRED);
            return;
        }

        if (password !== confirmPassword) {
            setError(ErrorMessage.ERROR_PASSWORD_DO_NOT_MATCH);
            return;
        }

        try {
            const userData = { username: name, email, password };
            const response = await axios.post(APIEndpoints.REGISTER_USER, userData);
            setTimeout(() => {
                setName('')
                setEmail('')
                setPassword('')
                setConfirmPassword('')
            }, 600)
            console.log('responseData', response.data)
            setSuccess("Account created successfully!");
            setError("");

            setTimeout(() => {
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
            }, 1500);
        } catch (err) {
            console.log('error', err)
            if (err.response.message === ErrorMessage.ERROR_SHORT_PASSWORD) {
                setError(ErrorMessage.ERROR_SHORT_PASSWORD)
                return;
            }
            console.log(err);
            setError(err.response?.data?.message || ErrorMessage.ERROR_CREATING_ACCOUNT);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}

                <form onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            value={name}
                            id="username"
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p>
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-500 hover:text-blue-700">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
