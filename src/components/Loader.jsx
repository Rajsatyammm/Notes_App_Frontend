import React from 'react';

function Loader() {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="w-14 h-14 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
    );
}

export default Loader;
