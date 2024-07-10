import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import UserProfile from './components/UserProfile';

const App = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={token ? <Navigate to="/profile" /> : <Login setToken={setToken} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile" element={token ? <UserProfile token={token} setToken={setToken} /> : <Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
