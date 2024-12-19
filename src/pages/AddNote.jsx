import NoteForm from "../components/NoteForm";

const AddNote = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    Add a New Note
                </h2>
                <NoteForm />
            </div>
        </div>
    );
}

export default AddNote;
