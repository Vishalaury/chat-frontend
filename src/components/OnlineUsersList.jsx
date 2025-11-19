import React from "react";

export default function OnlineUsersList({ users = [] }) {
  return (
    <div className="online-list" aria-label="online users">
      {users.map((u) => (
        <div key={u} className="online-user">
          
          {/* Avatar (Initial) */}
          <div className="online-avatar">
            {(u || "").charAt(0).toUpperCase()}
          </div>

          <div className="online-info">
            <div className="online-name">{u}</div>
            <div className="online-status">🟢 Online</div>
          </div>
        </div>
      ))}

      {users.length === 0 && (
        <div className="small muted">No one online</div>
      )}
    </div>
  );
}
