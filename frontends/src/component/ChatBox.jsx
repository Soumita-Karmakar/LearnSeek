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
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right top, #fceabb, #ab92fcff)",
        padding: "2rem",
      }}
    >
      <div
        className="container p-4 rounded"
        style={{
          background: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          borderRadius: "20px",
          maxWidth: "700px",
          width: "100%",
        }}
      >
        <h4 className="text-center fw-bold mb-4 text-dark">Live Chat</h4>

        <div
          style={{
            maxHeight: "350px",
            overflowY: "auto",
            padding: "15px",
            backgroundColor: "#ffffff70",
            borderRadius: "15px",
            marginBottom: "1rem",
            boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 mb-2 rounded-pill shadow-sm w-75 ${
                msg.senderId === currentUserId
                  ? "ms-auto"
                  : "me-auto"
              }`}
              style={{
                backgroundColor: msg.senderId === currentUserId ? "#e89a67ff" : "#f3bdbdff",
                color: msg.senderId === currentUserId ? "#000000ff" : "#333",
                wordBreak: "break-word",
                fontSize: "0.95rem",
                textAlign: msg.senderId === currentUserId ? "right" : "left",
              }}
            >
              {msg.text}
              <div className="text-muted small mt-1">
                {new Date(msg.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
          <div ref={scrollRef}></div>
        </div>

        <div className="d-flex">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="form-control me-2 rounded-pill shadow-sm"
            placeholder="Type your message..."
            style={{ backgroundColor: "#fff", border: "1px solid #ccc" }}
          />
          <button
            className="btn rounded-pill px-4 shadow-sm"
            onClick={handleSend}
            style={{
              backgroundColor: "#20c997",
              color: "#fff",
              border: "none",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
