import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (<>
        <h1>404 Not Found</h1>
        <div className='fixed bottom-0 right-0 m-8'>
            <Link to="/">
                <div className='p-4 bg-green-100 rounded-full flex justify-center'>Home</div>
            </Link>
        </div>
    </>);
}

export default NotFound;
