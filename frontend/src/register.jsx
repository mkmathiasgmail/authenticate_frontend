import { useState } from 'react';
import axios from 'axios'; // Import axios for making API requests
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State to store error message
    const [success, setSuccess] = useState(''); // State to store success message
    const [loading, setLoading] = useState(false); // State to manage loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true while waiting for response
        // Clear any previous errors
        // Clear any previous success messages

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', {
                name,
                email,
                password,
            });
            // Handle success
            console.log("Response:", response.data); // Log the response to check success
            // Handle success response: display the success message and handle further actions
            setSuccess("Registration successful! Please log in.");
            setLoading(false); // Set loading to false when the request is done
        } catch (error) {
            console.error("Error response:", error.response); // Log the full response

            // Check if there are validation errors
            if (error.response.data.errors) {
                setError(error.response.data.errors.email[0]); // "Registration failed. Please try again."
            } else {
                setError("Registration failed.");
            }
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow" style={{ width: "350px", borderRadius: "16px" }}>
                <div className="card-body">
                    <h2 className="text-center mb-4" style={{ fontWeight: "bold" }}>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label text-center w-100" style={{ fontWeight: "500" }}>Name</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                style={{ borderRadius: "8px" }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label text-center w-100" style={{ fontWeight: "500" }}>Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ borderRadius: "8px" }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label text-center w-100" style={{ fontWeight: "500" }}>Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{ borderRadius: "8px" }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100" disabled={loading} style={{ borderRadius: "8px", background: "linear-gradient(90deg,#1877f2,#2563eb)" }}>
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                    {success && <div className="alert alert-success mt-3">{success}</div>}
                </div>
            </div>
            </div>
        );
    }

export default Register;