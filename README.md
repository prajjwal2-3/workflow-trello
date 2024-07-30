# Trello-Style Task Management Application

This is a full-stack Task Management Application built with **Next.js** and **TypeScript** for the frontend and **Node.js** with **Express** ,**MongoDB**, **Typescript** for the backend. The application allows users to register, log in, and manage tasks with features such as creating, updating, deleting, and retrieving tasks.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)

## Features

- User registration and authentication
- Create, read, update, and delete tasks
- Task categorization with status and priority
- Responsive design for mobile and desktop

## Technologies Used

- **Frontend**: 
  - Next.js
  - React
  - TypeScript
  - Axios
  - Tailwind CSS
  - Shadcn
  - NextAuth for session management
  - Framer-motion for animation
  - Bcrypt for hashing passwords
  - Redux for state management (used createAsyncThunk for database sync)

- **Backend**: 
  - Node.js
  - Express
  - TypeScript
  - MongoDB with Mongoose
  - nodemon for local development

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

Clone the repository
```bash
   git clone https://github.com/prajjwal2-3/workflow-trello.git
   cd workflow-trello
   ```

### Backend Setup

1. **Cd into the folder**:

   ```bash
   cd trello-backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the `root` directory and add the following environment variables:

   ```plaintext
   PORT=5000
   MONGODB_URI=YOUR_DATABASE_URL
   
   ```

4. **Start the backend server**:

   ```bash
   npm run dev
   ```

   The backend server will run on `http://localhost:5000`.


### Frontend Setup

1. **Navigate to the frontend directory**:

   ```bash
   cd ../trello
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env.local` file** in the `trello` directory and add the following environment variable:

   ```plaintext
   NEXTAUTH_SECRET=ANY_STRONG_SECRET
   ```

4. **Start the frontend server**:

   ```bash
   npm run dev
   ```

   The frontend application will run on `http://localhost:3000`.



