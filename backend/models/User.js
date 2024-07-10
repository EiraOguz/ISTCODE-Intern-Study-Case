const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: DataTypes.STRING,
    dob: DataTypes.DATE,
    profilePicture: { type: DataTypes.STRING, field: 'profile_picture' },
    instagram: DataTypes.STRING,
    twitter: DataTypes.STRING,
    github: DataTypes.STRING,
    linkedin: DataTypes.STRING
}, {
    timestamps: true,
    underscored: true
});

module.exports = User;
