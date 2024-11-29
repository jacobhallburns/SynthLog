import React from 'react';
import {useLocation} from 'react-router-dom';

const MyNotebook = () => {
    // these 2 lines get notebook name from boot.jsx
    const location = useLocation();
    const notebookName = location.state?.notebookName;

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>{notebookName}</h1>
        </div>
    );
};

export default MyNotebook;
