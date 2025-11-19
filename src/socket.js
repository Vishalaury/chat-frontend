
// import { io } from 'socket.io-client';

// // Vite environment variable
// const URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5001';
// console.log('SERVER URL socket.io ->', URL);

// export const socket = io(URL, { autoConnect: false });

// export function connectWithToken(token) {
//   socket.auth = { token };
//   socket.connect();
// }


import { io } from "socket.io-client";

const URL = import.meta.env.VITE_SERVER_URL;

console.log("Socket connecting to:", URL);

export const socket = io(URL, {
  autoConnect: false,
  transports: ["websocket"],
});

export function connectWithToken(token) {
  socket.auth = { token };
  socket.connect();
}
