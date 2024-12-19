import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import ErrorMessage from '../constants/ErrorMessage';
import APIEndpoint from '../constants/APIEndpoints'
function NoteForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!title || !content || !category) {
                setError("All fields are required.")
                return;
            }
            await axios.post(APIEndpoint.ADD_NOTE,
                {
                    title,
                    content,
                    category
                },
                {
                    headers: {
                        'x-auth-token': localStorage.getItem('token')
                    }
                }
            );
            setTitle('');
            setContent('');
            setCategory('');
            navigate('/dashboard')
        } catch (error) {
            if (error.response.data.message === ErrorMessage.ERROR_AUTH_DENIED)
                navigate('/login')
            console.error(ErrorMessage.ERROR_CREATING_NOTE, error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <input
                type="text"
                placeholder="Note Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
            />
            <textarea
                placeholder="Note Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
            />
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                Add Note
            </button>
        </form>
    );
};

export default NoteForm;