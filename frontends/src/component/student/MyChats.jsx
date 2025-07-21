import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaComments } from "react-icons/fa";

const MyChats = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/conversations/${user.id}/${user.role}`
        );
        const data = await res.json();
        if (res.ok) {
          setChats(data);
        } else {
          console.error("Failed to fetch chats");
        }
      } catch (err) {
        console.error("Error loading chats:", err);
      }
    };

    if (user?.id) fetchChats();
  }, [user.id, user.role]);

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #c2e9fb, #a1c4fd)",
        padding: "2rem",
      }}
    >
      <div
        className="container p-4 rounded"
        style={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          borderRadius: "20px",
          maxWidth: "800px",
          width: "100%",
        }}
      >
        <h2 className="text-center fw-bold mb-4 text-dark">
          <FaComments className="me-2 text-primary" />
          Conversations
        </h2>

        {chats.length === 0 ? (
          <p className="text-center text-muted">No conversations yet.</p>
        ) : (
          <div className="row g-3">
            {chats.map((chat, idx) => {
              const otherUser =
                chat.senderId._id === user.id ? chat.receiverId : chat.senderId;
              const studentId = user.role === "Student" ? user.id : otherUser._id;
              const teacherId = user.role === "Student" ? otherUser._id : user.id;

              return (
                <div key={idx} className="col-md-6">
                  <div
                    className="p-3 rounded shadow-sm h-100 d-flex flex-column justify-content-between"
                    style={{
                      background: "#ffffffcc",
                      border: "1px solid #e0e0e0",
                      borderRadius: "15px",
                      transition: "0.3s",
                    }}
                  >
                    <div>
                      <h5 className="text-dark">{otherUser.name || "Unknown User"}</h5>
                      <p className="small text-muted mb-2">{chat.text}</p>
                    </div>
                    <Link
                      to={`/chat/${studentId}/${teacherId}`}
                      className="btn btn-outline-dark btn-sm rounded-pill align-self-start"
                    >
                      Continue Chat
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyChats;
