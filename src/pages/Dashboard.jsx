import { useState, useEffect } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import ErrorMessage from "../constants/ErrorMessage";
import NoteCard from "../components/NoteCard";
import APIEndpoints from "../constants/APIEndpoints";

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [showingFilteredNotes, setShowingFilteredNotes] = useState(false);

    const fetchNotes = async () => {
        try {
            const response = await axios.get(APIEndpoints.GET_ALL_NOTES, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            setNotes(response.data);
        } catch (error) {
            console.log(ErrorMessage.ERROR_FETCHING_NOTES, error);
        }
    };

    const handleDeleteNote = (noteId) => {
        setNotes(notes.filter(note => note._id !== noteId));
        if (showingFilteredNotes) {
            setFilteredNotes(filteredNotes.filter(note =>
                note._id !== noteId)
            )
        }
    };

    const handleSearch = () => {
        const filtered = notes.filter(note =>
            note.category.toLowerCase().includes(searchText.toLowerCase()) ||
            note.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredNotes(filtered);
        setShowingFilteredNotes(true);
    };

    const handleClearSearch = () => {
        setSearchText("");
        setShowingFilteredNotes(false);
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold mb-4 sm:mb-0">Dashboard</h1>

                    <div className="relative flex items-center w-full sm:w-auto mb-4 sm:mb-0">
                        <input
                            type="text"
                            name="search"
                            id="search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="p-2 border border-gray-300 rounded-l w-full sm:w-64"
                            placeholder="Search category"
                        />

                        {/* Clear Search Button */}
                        {searchText && (
                            <button
                                onClick={handleClearSearch}
                                className="absolute right-24 text-gray-600 hover:text-gray-800"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        )}

                        <button
                            onClick={handleSearch}
                            className="bg-blue-500 text-white py-2 px-4 rounded-r hover:bg-blue-600"
                        >
                            Search
                        </button>
                    </div>

                    <Link
                        to="/addNotes"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full sm:w-auto"
                    >
                        Add Notes
                    </Link>
                </div>

                {showingFilteredNotes && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredNotes.map((note) => (
                            <NoteCard
                                data={note}
                                key={note._id}
                                onDelete={handleDeleteNote}
                            />
                        ))}
                    </div>
                )}

                {!showingFilteredNotes && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <NoteCard
                                data={note}
                                key={note._id}
                                onDelete={handleDeleteNote}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
