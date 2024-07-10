import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false); // Yeni eklenen satır

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/signup', { username, email, password });
            setIsRegistered(true); // Kullanıcı kaydı başarılı olduğunda true olarak ayarla
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    // Yeni eklenen blok
    if (isRegistered) {
        return <Navigate to="/" />;
    }

    return (
        <div className="form-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Signup</button>
            </form>
            <p>Already have an account? <Link to="/">Login</Link></p>
        </div>
    );
};

export default Signup;
