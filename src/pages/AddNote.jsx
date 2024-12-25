import { useState, useEffect } from "react";
import NoteForm from "../components/NoteForm";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import axios from "../axios";
import APIEndpoints from "../constants/APIEndpoints";

const AddNote = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const params = useParams();
    const id = params.id;

    const fetchNotes = async () => {
        const response = await axios.get(`${APIEndpoints.GET_NOTE}${id}`,
            {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            }
        )
        setData(response.data);
    }

    useEffect(() => {
        if (id)
            fetchNotes();
    }, [])

    const setLoader = (bool) => {
        setLoading(bool);
    }

    return (loading ? <Loader /> :
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    {id ? "Update Note" : "Add a New Note"}
                </h2>
                {data ?
                    <NoteForm
                        setLoader={setLoader}
                        updateNote={true}
                        data={data}
                    /> :
                    <NoteForm
                        setLoader={setLoader}
                    />
                }
            </div>
        </div>
    );
}

export default AddNote;
