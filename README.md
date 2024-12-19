# React + Vite

# Notes App Frontend

Welcome to the Notes App frontend! This app allows users to manage their notes, including creating, updating, and deleting them. The app also supports user authentication, allowing users to sign up, log in, and view their profile.

## Table of Contents

- [Installation](#installation)
- [Tech Stack](#tech-stack)
- [Routes](#routes)
- [API Endpoints](#api-endpoints)
- [How to Run](#how-to-run)

## Installation

To get started, clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/Rajsatyammm/Notes_App_Frontend

npm install
```
## Tech Stack

This project is built with the following technologies:
```
React for building the user interface
React Router for handling routing
Axios for API requests
Bootstrap for styling
Features
User Authentication: Sign up, login, and view user profile.
Note Management: Create, update, and delete notes.
Dashboard: View all your notes in a single place.
```
## Routes
The application has the following routes:

```
/login - Login page for existing users.
/signup - Signup page to register a new user.
/addNotes - Page to add a new note.
/dashboard - The main dashboard where users can see all their notes.
/profile - User profile page displaying user details.
/ - Home page with a welcome message.
```
API Endpoints
Here are the API endpoints used by the frontend:

```js
const APIEndpoints = {
    "GET_ALL_NOTES": "/api/notes/getAll",
    "DELETE_NOTE": "/api/notes/delete/", // Requires note ID
    "ADD_NOTE": "/api/notes/add",
    "USERS_LOGIN": "/api/users/login",
    "REGISTER_USER": "/api/users/register",
    "USER_PROFILE": "/api/users/me"
}
```
```
GET_ALL_NOTES: Retrieves all notes for the authenticated user.
DELETE_NOTE: Deletes a note by ID.
ADD_NOTE: Adds a new note.
UPDATE_NOTE: Updates an existing note.
USERS_LOGIN: Authenticates a user using their credentials.
REGISTER_USER: Registers a new user.
USER_PROFILE: Fetches the profile information of the logged-in user.
```
## How to Run
```
Make sure the backend API is running 
check this url for details
https://github.com/Rajsatyammm/Notes_App_Backend"
```
Start the frontend app using:
```bash
npm run dev
Visit http://localhost:3000 to access the Notes App in your browser.
```

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
