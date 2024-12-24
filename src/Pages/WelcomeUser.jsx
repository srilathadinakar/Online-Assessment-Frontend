import React from 'react';
import { Link } from 'react-router-dom';


const WelcomeUser = () => {
    const userName = localStorage.getItem("name");
    return (
        <div className="container mx-auto py-12 px-4 md:px-16 lg:px-24">
            <h2 className="text-2xl font-bold mb-6 text-center">Welcome back <span className='text-green-500'>{userName}</span></h2>
            <p className='text-lg'>You already took the test. you can't take it again.<br />
            You can view your results.</p>
            <p className='mt-6 text-lg text-white'><span className='bg-green-500 p-2 rounded-md'><Link to="/results">Your Results</Link></span></p>
        </div>
    );
};

export default WelcomeUser;