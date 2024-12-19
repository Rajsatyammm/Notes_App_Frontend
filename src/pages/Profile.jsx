import { useState, useEffect } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import APIEndpoints from "../constants/APIEndpoints";

const Profile = () => {
    const [user, setUser] = useState({ name: "", email: "" });
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(APIEndpoints.USER_PROFILE, {
                    headers: { "x-auth-token": localStorage.getItem("token") }
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data", error);
                navigate("/login");
            }
        };

        fetchUser();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                "/api/users/updateProfile",
                { name: user.name, email: user.email },
                { headers: { "x-auth-token": localStorage.getItem("token") } }
            );
            setSuccess("Profile updated successfully!");
        } catch (err) {
            setError("Error updating profile.");
        }
    };

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">name</label>
                        <input
                            type="text"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Update</button>
                </form>
            </div>
        </div>
    );
};

export default Profile