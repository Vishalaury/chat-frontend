# Live Chat Application – Frontend

## Overview
This repository contains the frontend of the Real-Time Chat Application built using React.js and Socket.io Client.  
The frontend is responsible for the user interface, real-time communication, room management, authentication, and theme control.

## Features
1. User Authentication  
   Users can register, log in, or join using guest mode.  
   JWT token is used for authenticated requests.

2. Real-Time Messaging  
   Messages are delivered instantly using Socket.io.  
   All users in the same room receive messages in real time.

3. Chat Rooms  
   Users can join any available room or create new rooms.  
   Default rooms cannot be deleted.  
   User-created rooms can be deleted.

4. Online Users Display  
   Shows active users in the current room.  
   Automatically updates when a user joins or leaves.

5. Typing Indicator  
   Displays when other users are typing in the room.

6. Chat History  
   Loads recent chat history from the backend when entering a room.

7. Light and Dark Theme  
   Users can switch between light and dark modes.



## Project Links
Frontend Live URL  
subtle-fenglisu-cf934c.netlify.app

Backend API URL  
https://real-time-chat-backend-2-dw7c.onrender.com

Frontend GitHub Repository  
https://github.com/Vishalaury/chat-frontend

Backend GitHub Repository  
https://github.com/Vishalaury/real-time-chat-backend
