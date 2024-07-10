import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './UserProfile.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const UserProfile = ({ token, setToken }) => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        phone: '',
        dob: '',
        profilePicture: '',
        instagram: '',
        twitter: '',
        github: '',
        linkedin: ''
    });
    const [profileImage, setProfileImage] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    const sendToken = useCallback((token) => {
        if (token) {
            axios.post('http://localhost:5000/api/auth/middleware', { token: token })
                .then(res => {
                    setUserId(res.data.userData.id);
                })
                .catch(err => console.error(err));
        }
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        sendToken(storedToken);
    }, [sendToken]);

    useEffect(() => {
        if (userId) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUser(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error('There was an error fetching the user data!', error);
                    setLoading(false);
                }
            };
            fetchUserData();
        }
    }, [token, userId]);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = { ...user };
            if (profileImage) {
                const formData = new FormData();
                formData.append('profilePicture', profileImage);
                const uploadResponse = await axios.put(`http://localhost:5000/api/users/${userId}/profile-picture`, formData);
                updatedUser.profilePicture = uploadResponse.data.profilePicture;
            }
            
            await axios.put(`http://localhost:5000/api/users/${userId}`, updatedUser);
            console.log('User updated successfully!');
            
            // Resim yüklendiğinde sayfayı yenile
            if (profileImage) {
                window.location.reload();
            }
        } catch (error) {
            console.error('There was an error updating the user data!', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    const handleDeleteUser = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('User deleted successfully!');
            handleLogout();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleClickSocialMedia = (url) => {
        if (url) {
            window.open(url, '_blank');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <div className="live-preview">
                <h3>Live Preview</h3>
                {user.profilePicture && <img src={`http://localhost:5000/uploads/${user.profilePicture}`} alt="Profile" width="100" />}
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Date of Birth:</strong> {user.dob}</p>
                <div className="social-media-icons">
                    <button onClick={() => handleClickSocialMedia(user.instagram)} className={`btn btn-light ${!user.instagram && 'disabled'}`}>
                        <i className="bi bi-instagram"></i>
                    </button>
                    <button onClick={() => handleClickSocialMedia(user.twitter)} className={`btn btn-light ${!user.twitter && 'disabled'}`}>
                        <i className="bi bi-twitter"></i>
                    </button>
                    <button onClick={() => handleClickSocialMedia(user.github)} className={`btn btn-light ${!user.github && 'disabled'}`}>
                        <i className="bi bi-github"></i>
                    </button>
                    <button onClick={() => handleClickSocialMedia(user.linkedin)} className={`btn btn-light ${!user.linkedin && 'disabled'}`}>
                        <i className="bi bi-linkedin"></i>
                    </button>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={user.username || ''}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={user.email || ''}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    name="phone"
                    value={user.phone || ''}
                    onChange={handleChange}
                    placeholder="Phone"
                />
                <input
                    type="date"
                    name="dob"
                    value={user.dob || ''}
                    onChange={handleChange}
                    placeholder="Date of Birth"
                />
                <input
                    type="text"
                    name="instagram"
                    value={user.instagram || ''}
                    onChange={handleChange}
                    placeholder="Instagram"
                />
                <input
                    type="text"
                    name="twitter"
                    value={user.twitter || ''}
                    onChange={handleChange}
                    placeholder="Twitter"
                />
                <input
                    type="text"
                    name="github"
                    value={user.github || ''}
                    onChange={handleChange}
                    placeholder="Github"
                />
                <input
                    type="text"
                    name="linkedin"
                    value={user.linkedin || ''}
                    onChange={handleChange}
                    placeholder="Linkedin"
                />
                <input
                    type="file"
                    name="profilePicture"
                    onChange={handleImageChange}
                />
                <div className="action-buttons">
                    <button type="submit">Save Information</button>
                    <button type="button" onClick={handleDeleteUser}>Delete Account</button>
                    <button type="button" onClick={handleLogout}>Logout</button>
                </div>
            </form>
        </div>
    );
};

export default UserProfile;
