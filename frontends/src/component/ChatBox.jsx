import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ChatBox = () => {
  const { studentId, teacherId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const scrollRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser?.id;
  const currentUserModel = currentUser?.role === "student" ? "Student" : "Teacher";

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/chat/${studentId}/${teacherId}`);
        const data = await res.json();
        if (res.ok) setMessages(data);
        else toast.error("Failed to load messages");
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchMessages();
  }, [studentId, teacherId]);

  // Send message
  const handleSend = async () => {
    if (!text.trim()) return toast.warn("Type something first");

    try {
      const res = await fetch(`http://localhost:8000/api/chat/${studentId}/${teacherId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: currentUserId,
          senderModel: currentUserModel,
          text,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessages((prev) => [...prev, data]);
        setText("");
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      } else toast.error(data.message || "Send failed");
    } catch (err) {
      console.error("Send error:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="text-center mb-3">Chat</h4>
      <div style={{ maxHeight: "300px", overflowY: "auto", background: "#f1f1f1", padding: "10px" }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 mb-2 rounded ${msg.senderId === currentUserId ? "bg-primary text-white text-end" : "bg-light text-start"}`}
          >
            {msg.text}
            <div className="text-muted small">{new Date(msg.createdAt).toLocaleString()}</div>
          </div>
        ))}
        <div ref={scrollRef}></div>
      </div>
      <div className="d-flex mt-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="form-control me-2"
          placeholder="Type your message..."
        />
        <button className="btn btn-success" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
