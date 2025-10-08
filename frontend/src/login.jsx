import { useState } from 'react';
import axios from 'axios'; // Import axios for making API requests
import 'bootstrap/dist/css/bootstrap.min.css'; // Using Bootstrap for basic styling

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(''); // State to store success message
    const [error, setError] = useState(''); // State to store error message
    const [loading, setLoading] = useState(false); // State to manage loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true while waiting for response

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password,
            });
            console.log("Response:", response.data); // Log the response

            // Handle successful login response
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setSuccess("Login successful!");
            setLoading(false); // Reset loading state
        } catch (error) {
            console.error("Login error:", error); // Log the error for debugging
            setLoading(false); // Reset loading state
            setError("Invalid login response. Please try again.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 light">
            <div>
                <div className="card p-4 shadow">
                    <h2 className="text-center mt-2">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
                {/* Messages displayed below the card */}
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                {success && <div className="alert alert-success mt-3">{success}</div>}
            </div>
        </div>
    );
};




export default Login;