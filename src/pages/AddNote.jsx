import { useState } from "react";
import NoteForm from "../components/NoteForm";
import Loader from "../components/Loader";

const AddNote = () => {
    const [loading, setLoading] = useState(false)
    const setLoader = (bool) => {
        setLoading(bool);
    }

    return (loading ? <Loader /> :
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    Add a New Note
                </h2>
                <NoteForm setLoader={setLoader} />
            </div>
        </div>
    );
}

export default AddNote;
