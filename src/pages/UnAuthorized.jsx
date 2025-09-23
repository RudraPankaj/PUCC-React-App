import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function UnAuthorized() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
                <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
                    <i className="bi bi-shield-lock-fill text-6xl text-red-500 mb-4"></i>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Unauthorized Access</h1>
                    <p className="text-gray-600 mb-4 text-center">
                        Sorry, you do not have permission to view this page.
                    </p>
                    <ul className="list-disc list-inside text-left text-gray-700 mb-6">
                        <li>Your account does not have the required privileges.</li>
                        <li>You may not be logged in.</li>
                        <li>Your session may have expired.</li>
                        <li>The resource is restricted to certain users.</li>
                    </ul>
                    <Link
                        to="/"
                        className="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Go to Home
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default UnAuthorized;
