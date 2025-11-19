// import React, { useEffect, useMemo, useState } from "react";
// import { socket } from "../socket";
// import MessageList from "./MessageList";
// import MessageInput from "./MessageInput";
// import OnlineUsersList from "./OnlineUsersList";
// import TypingIndicator from "./TypingIndicator";

// export default function ChatRoom({
//   username,
//   room,
//   token,
//   onSwitchRoom,
//   theme,
//   setTheme,
//   logout,   //  LOGOUT RECEIVED
// }) {
//   const [rooms, setRooms] = useState([]);
//   const [newRoom, setNewRoom] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [typingUsers, setTypingUsers] = useState(new Set());

//   async function deleteRoom(roomName) {
//     try {
//       const BASE =
//         (import.meta.env.VITE_SERVER_URL || "").trim() ||
//         "http://localhost:5001";

//       const res = await fetch(`${BASE}/rooms/${roomName}`, { method: "DELETE" });
//       const data = await res.json().catch(() => ({}));

//       if (data.error) return alert(data.error);
//       if (room === roomName) onSwitchRoom("general");

//     } catch (err) {
//       console.error("Delete room error:", err);
//     }
//   }

//   useEffect(() => {
//     const BASE =
//       (import.meta.env.VITE_SERVER_URL || "").trim() ||
//       "http://localhost:5001";

//     fetch(`${BASE}/rooms`)
//       .then((r) => r.json())
//       .then(setRooms)
//       .catch(console.error);

//     socket.on("roomsUpdated", setRooms);
//     return () => socket.off("roomsUpdated", setRooms);
//   }, []);

//   useEffect(() => {
//     function onChatHistory(history) {
//       setMessages(Array.isArray(history) ? history : []);
//     }
//     function onChatMessage(msg) {
//       if (msg?.text && msg?.username) setMessages((p) => [...p, msg]);
//     }
//     function onOnlineUsers(list) {
//       setOnlineUsers(Array.isArray(list) ? list : []);
//     }
//     function onTyping({ username: u, isTyping }) {
//       setTypingUsers((prev) => {
//         const next = new Set(prev);
//         isTyping ? next.add(u) : next.delete(u);
//         return next;
//       });
//     }

//     socket.on("chatHistory", onChatHistory);
//     socket.on("chatMessage", onChatMessage);
//     socket.on("onlineUsers", onOnlineUsers);
//     socket.on("typing", onTyping);

//     return () => {
//       socket.off("chatHistory", onChatHistory);
//       socket.off("chatMessage", onChatMessage);
//       socket.off("onlineUsers", onOnlineUsers);
//       socket.off("typing", onTyping);
//     };
//   }, []);

//   const typingText = useMemo(() => {
//     const arr = Array.from(typingUsers).filter((u) => u !== username);
//     if (!arr.length) return "";
//     if (arr.length === 1) return `${arr[0]} is typing...`;
//     return `${arr.slice(0, 2).join(", ")}${
//       arr.length > 2 ? " +" + (arr.length - 2) : ""
//     } are typing...`;
//   }, [typingUsers, username]);

//   return (
//     <>
//       <div className="sidebar">

//         <div className="brand">
//           <div className="logo">C</div>
//           <div>
//             <h2>CloudChat</h2>
//             <div className="kv">Realtime demo</div>
//           </div>
//         </div>

//         <div className="section-title">Rooms</div>

//         <div className="rooms">
//           {rooms.map((r) => (
//             <div key={r} className="room-row">
//               <button
//                 className={`room-chip ${r === room ? "active" : ""}`}
//                 onClick={() => onSwitchRoom(r)}
//               >
//                 #{r}
//               </button>

//               {!["general", "random", "tech", "music"].includes(r) && (
//                 <button className="room-delete" onClick={() => deleteRoom(r)}>
//                   Delete
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="create-box">
//           <input
//             className="input"
//             placeholder="New room name"
//             value={newRoom}
//             onChange={(e) => setNewRoom(e.target.value)}
//             style={{ width: "100%", marginBottom: "10px" }}
//           />

//           <button
//             className="btn primary"
//             style={{ width: "100%" }}
//             onClick={() => {
//               const name = (newRoom || "").trim();
//               if (!name) return;

//               socket.emit("createRoom", name, (res) => {
//                 if (!res || res.error)
//                   return alert(res?.error || "Failed to create room");

//                 setNewRoom("");
//                 setMessages([]);
//                 onSwitchRoom(name);
//               });
//             }}
//           >
//             Create
//           </button>

//           <button
//             className="theme-toggle"
//             style={{ width: "100%", marginTop: "12px" }}
//             onClick={() => {
//               setTheme(theme === "dark" ? "light" : "dark");
//               document.body.setAttribute(
//                 "data-theme",
//                 theme === "dark" ? "light" : "dark"
//               );
//             }}
//           >
//             {theme === "dark" ? "Light mode" : "Dark mode"}
//           </button>
//         </div>

//         <div className="section-title">Online</div>
//         <OnlineUsersList users={onlineUsers} />

//         {/*  LOGOUT BUTTON */}
//         <button
//           className="btn"
//           style={{
//             width: "100%",
//             marginTop: "20px",
//             background: "#ff4d4d",
//             color: "white",
//             fontWeight: "600",
//             borderRadius: "8px",
//           }}
//           onClick={logout}
//         >
//           Logout
//         </button>

//       </div>

//       <div className="content">
//         <div className="topbar">
//           <div className="room-title">#{room}</div>
//           <div className="kv">You: {username}</div>
//         </div>

//         <div className="messages-area">
//           <MessageList messages={messages} me={username} />
//           <div className="typing">
//             <TypingIndicator text={typingText} />
//           </div>
//         </div>

//         <div className="footer">
//           <div style={{ flex: 1 }} className="message-input-wrapper">
//             <MessageInput
//               onTyping={(is) =>
//                 socket.emit("typing", { room, username, isTyping: is })
//               }
//               onSend={(text) =>
//                 socket.emit("chatMessage", { room, username, text })
//               }
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import React, { useEffect, useMemo, useState } from "react";
import { socket } from "../socket";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import OnlineUsersList from "./OnlineUsersList";
import TypingIndicator from "./TypingIndicator";

export default function ChatRoom({
  username,
  room,
  token,
  onSwitchRoom,
  theme,
  setTheme,
  logout,
}) {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState(new Set());

  async function deleteRoom(roomName) {
    try {
      const BASE =
        (import.meta.env.VITE_SERVER_URL || "").trim() ||
        "http://localhost:5001";

      const res = await fetch(`${BASE}/rooms/${roomName}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));

      if (data.error) return alert(data.error);
      if (room === roomName) onSwitchRoom("main");

    } catch (err) {
      console.error("Delete room error:", err);
    }
  }

  useEffect(() => {
    const BASE =
      (import.meta.env.VITE_SERVER_URL || "").trim() ||
      "http://localhost:5001";

    fetch(`${BASE}/rooms`)
      .then((r) => r.json())
      .then(setRooms)
      .catch(console.error);

    socket.on("roomsUpdated", setRooms);
    return () => socket.off("roomsUpdated", setRooms);
  }, []);

  useEffect(() => {
    function onChatHistory(history) {
      setMessages(Array.isArray(history) ? history : []);
    }
    function onChatMessage(msg) {
      if (msg?.text && msg?.username) setMessages((p) => [...p, msg]);
    }
    function onOnlineUsers(list) {
      setOnlineUsers(Array.isArray(list) ? list : []);
    }
    function onTyping({ username: u, isTyping }) {
      setTypingUsers((prev) => {
        const next = new Set(prev);
        isTyping ? next.add(u) : next.delete(u);
        return next;
      });
    }

    socket.on("chatHistory", onChatHistory);
    socket.on("chatMessage", onChatMessage);
    socket.on("onlineUsers", onOnlineUsers);
    socket.on("typing", onTyping);

    return () => {
      socket.off("chatHistory", onChatHistory);
      socket.off("chatMessage", onChatMessage);
      socket.off("onlineUsers", onOnlineUsers);
      socket.off("typing", onTyping);
    };
  }, []);

  const typingText = useMemo(() => {
    const arr = Array.from(typingUsers).filter((u) => u !== username);
    if (!arr.length) return "";
    if (arr.length === 1) return `${arr[0]} is typing...`;
    return `${arr.slice(0, 2).join(", ")}${
      arr.length > 2 ? " +" + (arr.length - 2) : ""
    } are typing...`;
  }, [typingUsers, username]);

  return (
    <>
      <div className="sidebar">

        <div className="brand">
          <div className="logo">C</div>
          <div>
            <h2>CloudChat</h2>
            <div className="kv">Realtime demo</div>
          </div>
        </div>

        <div className="section-title">Rooms</div>

        <div className="rooms">
          {rooms.map((r) => (
            <div key={r} className="room-row">
              <button
                className={`room-chip ${r === room ? "active" : ""}`}
                onClick={() => onSwitchRoom(r)}
              >
                #{r}
              </button>

              {/* Only show delete for user-created rooms */}
              {!["main", "chill", "work", "fun"].includes(r) && (
                <button className="room-delete" onClick={() => deleteRoom(r)}>
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="create-box">
          <input
            className="input"
            placeholder="New room name"
            value={newRoom}
            onChange={(e) => setNewRoom(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />

          <button
            className="btn primary"
            style={{ width: "100%" }}
            onClick={() => {
              const name = (newRoom || "").trim();
              if (!name) return;

              socket.emit("createRoom", name, (res) => {
                if (!res || res.error)
                  return alert(res?.error || "Failed to create room");

                setNewRoom("");
                setMessages([]);
                onSwitchRoom(name);
              });
            }}
          >
            Create
          </button>

          {/* Final theme toggle */}
          <button
            className="theme-toggle"
            style={{ width: "100%", marginTop: "12px" }}
            onClick={() => {
              const newTheme = theme === "light" ? "dark" : "light";
              setTheme(newTheme);
              document.body.setAttribute("data-theme", newTheme);
            }}
          >
            {theme === "light" ? "Dark mode" : "Light mode"}
          </button>
        </div>

        <div className="section-title">Online</div>
        <OnlineUsersList users={onlineUsers} />

        <button
          className="btn"
          style={{
            width: "100%",
            marginTop: "20px",
            background: "#ff4d4d",
            color: "white",
            fontWeight: "600",
            borderRadius: "8px",
          }}
          onClick={logout}
        >
          Logout
        </button>

      </div>

      <div className="content">
        <div className="topbar">
          <div className="room-title">#{room}</div>
          <div className="kv">You: {username}</div>
        </div>

        <div className="messages-area">
          <MessageList messages={messages} me={username} />
          <div className="typing">
            <TypingIndicator text={typingText} />
          </div>
        </div>

        <div className="footer">
          <div style={{ flex: 1 }} className="message-input-wrapper">
            <MessageInput
              onTyping={(is) =>
                socket.emit("typing", { room, username, isTyping: is })
              }
              onSend={(text) =>
                socket.emit("chatMessage", { room, username, text })
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
