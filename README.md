`# MERN App Setup Guide

## Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Configuring Firebase](#configuring-firebase)
- [Running the App](#running-the-app)
- [Environment Variables](#environment-variables)

---

## Introduction
This guide provides instructions to set up and run a MERN (MongoDB, Express.js, React.js, Node.js) application. Additionally, it explains how to configure Firebase to enable features like authentication and analytics.

## Prerequisites
Ensure that you have the following installed:
- [Node.js](https://nodejs.org/) (v12 or later)
- [MongoDB](https://www.mongodb.com/) (local or MongoDB Atlas)
- [Firebase Account](https://firebase.google.com/)

## Backend Setup

1. **Navigate to the Backend Directory**
   ```bash
   cd /path-to-your-project/backend `

1.  **Install Dependencies**

    bash

    Copy code

    `npm install`

2.  **Create a `.env` File**\
    Add environment variables at the root of your backend folder:

    dotenv

    Copy code

    `PORT=5000
    MONGO_URI=your_mongodb_uri_here
    JWT_SECRET=your_jwt_secret_key`

3.  **Start the Backend Server**

    bash

    Copy code

    `npm start`

    The backend will run at `http://localhost:5000` (or the port specified in your `.env` file).

Frontend Setup
--------------

1.  **Navigate to the Frontend Directory**

    bash

    Copy code

    `cd /path-to-your-project/frontend`

2.  **Install Dependencies**

    bash

    Copy code

    `npm install`

3.  **Configure Firebase in the Frontend**\
    Create a `firebaseConfig.js` file in the `src` directory of your frontend (details in the Firebase configuration section below).

4.  **Start the Frontend Server**

    bash

    Copy code

    `npm start`

    The frontend will run at `http://localhost:3000`.

Configuring Firebase
--------------------

1.  **Go to Firebase Console**

    -   Go to Firebase Console and log in with your Google account.
2.  **Create a New Project**

    -   Click on **Add Project**, provide a name, and follow the prompts.
    -   Once created, you'll be redirected to the project dashboard.
3.  **Add Firebase to Your App**

    -   Click on the "Web" icon (`</>`) in your Firebase project dashboard.
    -   Register your app by providing a nickname and clicking "Register app."
4.  **Obtain Firebase SDK Configurations**\
    Firebase provides the SDK configuration for your app:

    javascript

    Copy code

    `const firebaseConfig = {
      apiKey: "your_api_key",
      authDomain: "your_project_id.firebaseapp.com",
      projectId: "your_project_id",
      storageBucket: "your_project_id.appspot.com",
      messagingSenderId: "your_messaging_sender_id",
      appId: "your_app_id"
    };`

    Copy this configuration and paste it into a `firebaseConfig.js` file in your frontend `src` directory.

5.  **Install Firebase SDK**

    bash

    Copy code

    `npm install firebase`

6.  **Initialize Firebase in `firebaseConfig.js`**

    javascript

    Copy code

    `import firebase from "firebase/app";
    import "firebase/auth";  // If using Firebase authentication

    const firebaseConfig = {
      apiKey: "your_api_key",
      authDomain: "your_project_id.firebaseapp.com",
      projectId: "your_project_id",
      storageBucket: "your_project_id.appspot.com",
      messagingSenderId: "your_messaging_sender_id",
      appId: "your_app_id"
    };

    firebase.initializeApp(firebaseConfig);
    export default firebase;`

7.  **Enable Authentication (Optional)**

    -   In **Authentication** within Firebase Console, click "Get Started."
    -   Enable the desired sign-in methods (e.g., Email/Password, Google).

Running the App
---------------

1.  **Start the Backend Server**

    bash

    Copy code

    `cd backend
    npm start`

2.  **Start the Frontend Server**\
    Open another terminal:

    bash

    Copy code

    `cd frontend
    npm start`

The app should now be accessible at `http://localhost:3000`.

* * * * *

Environment Variables
---------------------

### Backend

Add the following to a `.env` file in the backend directory:

-   `PORT`: The backend server's port (default is 5000).
-   `MONGO_URI`: MongoDB connection string.
-   `JWT_SECRET`: Secret key for JSON Web Token (JWT) authentication.

### Frontend

Add the following Firebase credentials to `firebaseConfig.js`:

-   `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, and `appId` from Firebase SDK setup.
