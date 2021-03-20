# Chat-app

A backend and frontend to a typical chat application like whatsapp. Exposes various end points that are required for functionalities like message exchange, read reciepts etc.


TODO List:

Backend:
- [x] Login and Logout `/auth`
- [x] Register `/register`
- [x] Session maintaining, authentication `maintaned by passport.js`
- [x] Message exchange between users
- [x] Dealing with more complicated cases ( Like when user is not online etc..)
- [x] `/history` route for chatting history of two users
- [x] Online offline feature added
- [x] A user can now have his own private friendlist where he can add friends provided he has their contact number and they exixt on the platform
- [x] Added image and video transfer capabilities.

Frontend:
- [x] Login, Register components for `/auth/login` and `/register` respectively.
- [x] Temporary component for `/message` route.
- [x] Connecting frontend components with backend Endpoints.
- [x] Added Redux flux architecture to the front-end for state managment.
- [X] Building final user friendly UI.
- [x] Styling UI and final touch-ups.

# Instructions to run:
- Fork/download the repository.
- add a `.env` file to server directory and paste `MONGO_LOC="mongodb://localhost:27017/chatsapp-master"` in it.
- install dependencies in both `server` and `chatsapp_frontend` directory by running `npm install`.
- run `npm start` for both server and frontend.
- server will be runnning on `localhost:5000`
- frontend will be running on `localhost:3000`
