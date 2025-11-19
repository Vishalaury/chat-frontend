import React, { useEffect, useState, useRef } from "react";

export default function MessageInput({ onSend, onTyping }) {
  const [text, setText] = useState("");
  const typingRef = useRef(null);

  useEffect(() => {
    if (!onTyping) return;
    if (typingRef.current) clearTimeout(typingRef.current);
    onTyping(true);
    typingRef.current = setTimeout(() => {
      onTyping(false);
    }, 800);
    return () => clearTimeout(typingRef.current);
  }, [text]); // eslint-disable-line react-hooks/exhaustive-deps

  function submit(e) {
    e && e.preventDefault && e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  }

  // support Enter to send
  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <form onSubmit={submit} style={{display:'flex',alignItems:'center',width:'100%',gap:12}}>
      <input
        aria-label="Type a message"
        className="message-input-field"
        placeholder="Write a message... (Enter to send)"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button type="submit" className="send-button">Send</button>
    </form>
  );
}
