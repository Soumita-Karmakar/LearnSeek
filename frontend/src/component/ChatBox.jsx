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
    <div className="h-screen w-screen flex flex-col p-6" style={{ background: "linear-gradient(to right top, #fceabb, #ab92fcff)" }}>
      <h3 className="text-center font-bold mb-3 text-gray-800 text-xl">💬 Say Something....</h3>

      <div className="flex-grow overflow-y-auto bg-white/60 p-5 rounded-xl mb-4 shadow-inner">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 mb-3 rounded-full shadow w-3/4 break-words text-base ${
              msg.senderId === currentUserId ? "ml-auto text-right bg-orange-300" : "mr-auto text-left bg-rose-200"
            } text-gray-900`}
          >
            {msg.text}
            <div className="text-xs text-gray-600 mt-1">
              {new Date(msg.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
        <div ref={scrollRef}></div>
      </div>

      <div className="flex">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow mr-3 rounded-full shadow border border-gray-300 px-4 py-3 text-base bg-white"
        />
        <button
          onClick={handleSend}
          className="px-6 py-3 rounded-full shadow bg-teal-500 text-white font-bold text-base border-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
