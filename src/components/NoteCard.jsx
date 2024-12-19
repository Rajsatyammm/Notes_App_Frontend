import axios from "../axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ErrorMessage from "../constants/ErrorMessage";
import APIEndpoints from "../constants/APIEndpoints";


const NoteCard = ({ data, onDelete }) => {

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${APIEndpoints.DELETE_NOTE}${id}`,
                {
                    headers: {
                        'x-auth-token': localStorage.getItem('token')
                    }
                }
            )
            if (response.status == 200) {
                onDelete(id);
            }
        } catch (err) {
            console.log(ErrorMessage.ERROR_DELETING_NOTES);
        }
    }

    const handleEdit = async (id) => {

    }

    return (
        <div className="relative border border-gray-300 rounded-lg p-4 bg-white shadow-md">
            <div className="absolute top-2 right-2 flex space-x-2">
                {/* <button
                    onClick={() => handleEdit(data._id)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit Note"
                >
                    <FaEdit size={20} />
                </button> */}
                <button
                    onClick={() => handleDelete(data._id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete Note"
                >
                    <FaTrashAlt size={20} />
                </button>
            </div>
            <h3 className="font-bold text-lg">
                {data.title}
            </h3>
            <p className="text-gray-600">
                {data.content}
            </p>
            <span className="text-sm text-gray-500">
                {new Date(data.updatedAt).toLocaleString()}
            </span>
        </div>
    );
};

export default NoteCard;
