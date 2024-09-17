# E-Learn

[![GitHub repo](https://img.shields.io/badge/github-gurudaspr/E--Learn-blue?style=flat-square&logo=github)](https://github.com/gurudaspr/E-Learn)

E-Learn is a comprehensive e-learning platform built with modern web technologies. It allows users to enroll in courses, watch video lessons, and provides administrators with course management capabilities.

![E-Learn Dashboard](https://github.com/gurudaspr/E-LEARN-APP/blob/main/images/Screenshot%202024-09-06%20095943.png)

## Features

- User authentication with OTP verification
- Course browsing and enrollment
- Video lesson playback
- Admin dashboard for course, topic, and video management
- Responsive design for various screen sizes

## Technologies Used

- Frontend:
  - React
  - Zustand for state management
  - Tailwind CSS
  - React Hook Form for validation
  - React Player for video playback
- Backend:
  - Node.js
  - Express.js
- Database:
  - MongoDB with Mongoose
- Image Upload:
  - Cloudinary

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/E-Learn.git
   cd E-Learn
   npm install
   ```
2. Install frontend dependencies
   ```bash
   cd frontend
   npm install
   ```
3. Install backend dependencies
   ```bash
   cd backend
   npm install
   ```
4. Set up environment variables:
   Create a .env file in the root directory and add the following:
   ```bash
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
5. Start the development server:
   Start backend server
   ```bash
   npm run server
   ```
   In a new terminal, start frontend
   ```bash
   cd client
   npm run dev
   ```
## Features

1. **Sign Up / Log In**: Create a new account or log in to an existing one using secure OTP verification.
   ![User Authentication](https://github.com/yourusername/E-Learn/blob/main/images/login.png)

2. **Browse Courses**: Explore a wide range of available courses and enroll with ease.
   ![Course List](https://github.com/yourusername/E-Learn/blob/main/images/courses.png)

3. **Watch Lessons**: Access high-quality video lessons for enrolled courses, with a smooth and intuitive player interface.
   ![Video Lesson](https://github.com/yourusername/E-Learn/blob/main/images/lesson.png)

4. **My Courses**: View all enrolled courses, track your progress, and easily resume where you left off.
   ![My Courses](https://github.com/yourusername/E-Learn/blob/main/images/my-courses.png)



# Contact
Your Name - gurudaspr
Project Link: https://github.com/gurudaspr/E-Learn
   

   