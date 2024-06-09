import React from 'react';

const Navbar = () => {
    return (
        <div className="bg-gray-200 h-[20vh] mb-2">
            <ul className="flex justify-center space-x-10 p-5">
                <li><img src="TS_logo.png" alt="TS Logo" className="w-32 h-32"/></li>
                <div className="flex flex-col justify-center">
                    <h1 className='text-3xl font-bold text-center'>REGISTRATION & STAMPS DEPARTMENT</h1>
                    <h3 className='text-2xl text-center'>Government of Telangana</h3>
                    <h4 className='text-xl text-center'>URL: {import.meta.env.VITE_APP_URL}</h4>
                </div>
            </ul>
        </div>
    );
}

export default Navbar;

