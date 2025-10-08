import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap for styling

const Home = () => {
    const navigate = useNavigate(); // Hook for navigation

    return (
        <div className="text-center mt-5">
            <h1>Laravel 11 React Authentication</h1>
            <div className="mt-4">
                <button className="btn btn-primary me-2" onClick={() => navigate('/login')}>
                    Login
                </button>
                <button className="btn btn-primary" onClick={() => navigate('/register')}>
                    Register
                </button>
            </div>
        </div>
    );
};

export default Home;