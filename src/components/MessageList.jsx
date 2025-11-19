import React, { useEffect, useRef } from "react";

export default function MessageList({ messages, me }) {
  const ref = useRef(null);

  const clean = (Array.isArray(messages) ? messages : []).filter(
    (m) => m && m.text && m.username
  );

  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, [clean]);

  return (
    <div className="messages" ref={ref}>
      {clean.map((m) => {
        const time = new Date(m.createdAt || Date.now()).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
        const key = m._id || `${m.username}-${m.createdAt}-${m.text}`;
        return (
          <div key={key} className={`msg ${m.username === me ? "me" : ""}`}>
            <div className="meta">
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8}}>
                <div style={{fontWeight:700}}>{m.username}</div>
                <div className="timestamp">{time}</div>
              </div>
            </div>
            <div style={{whiteSpace:'pre-wrap',lineHeight:1.45}}>{m.text}</div>
          </div>
        );
      })}
    </div>
  );
}
