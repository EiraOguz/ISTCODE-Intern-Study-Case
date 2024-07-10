# ISTCODE Intern Study Case

A user profile page for the Meetgate platform where users can view and edit their profile information.

## Project Description

The aim of this project is to create a user profile page for the Meetgate platform. Users should be able to enter basic information about themselves, upload a profile picture, and add social media accounts.

## Requirements

### User Interface (UI)

- Fields for entering basic information such as username, email address, phone number, and date of birth.
- Profile picture upload and change functionality.
- Fields for adding social media accounts (LinkedIn, Twitter, GitHub, etc.).
- "Save Information" button.

### Functionality (Backend)

- Store and update user information on the server.
- Upload and store profile pictures on the server.
- Store and update user social media accounts.

### Bonus Features

- Mobile responsive profile page.
- Real-time update feature while editing user information.
- Ability to delete user information.

 ### Video  

https://github.com/EiraOguz/ISTCODE-Intern-Study-Case/assets/165708130/38a43fdf-629a-466c-84c3-ff4b5e8d8db9

## Getting Started

### Prerequisites

- React
- Node.js
- MySQL

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/Meetgate-UserProfile.git
    cd Meetgate-UserProfile
    ```

2. Install backend dependencies:

    ```bash
    cd backend
    npm install
    ```

3. Install frontend dependencies:

    ```bash
    cd frontend
    npm install
    ```

### Database Setup

1. Open MySQL and run the following commands to create the database and `users` table:

    ```sql
    CREATE DATABASE meetgate;
    USE meetgate;

    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        dob DATE,
        profile_picture VARCHAR(255),
        instagram VARCHAR(255),
        twitter VARCHAR(255),
        github VARCHAR(255),
        linkedin VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    ```

### Running the Application

1. Start the backend server:

    ```bash
    cd backend
    node app.js
    ```

2. Start the frontend development server:

    ```bash
    cd frontend
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

## Technologies Used

### Backend

- Node.js
- Express
- MySQL
- Sequelize
- JWT (JSON Web Tokens)
- Multer
- Cors
- Bcrypt
- Body-parser
- Dotenv
- Nodemon

### Frontend

- React
- React Router DOM
- Axios
- Bootstrap Icons
