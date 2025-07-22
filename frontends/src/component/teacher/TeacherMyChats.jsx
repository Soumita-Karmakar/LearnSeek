import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyChatsTeacher = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/conversations/${user.id}/${user.role}`);
        const data = await res.json();
        if (res.ok) setChats(data);
      } catch (err) {
        console.error("Error fetching teacher chats:", err);
      }
    };

    if (user?.id) fetchChats();
  }, [user.id, user.role]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #f9fbe7, #e0f7fa)",
      }}
    >
      <div className="container py-5">
        <h3 className="text-center mb-4 text-primary fw-bold">💬 My Conversations</h3>

        {chats.length === 0 ? (
          <p className="text-center text-muted">No conversations yet.</p>
        ) : (
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="list-group">
                {chats.map((chat, idx) => {
                  const otherUser =
                    chat.senderId._id === user.id ? chat.receiverId : chat.senderId;

                  return (
                    <div
                      key={idx}
                      className="list-group-item list-group-item-action shadow-sm rounded mb-3"
                      style={{ backgroundColor: "#ffffffcc" }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h5 className="mb-1 text-dark">👤 {otherUser.name}</h5>
                          <p className="mb-0 text-secondary">
                            {chat.text || "Start the conversation..."}
                          </p>
                        </div>
                        <Link
                          to={`/chat/${user.role === "Teacher" ? user.id : otherUser._id}/${user.role === "Teacher" ? otherUser._id : user.id}`}
                          className="btn btn-sm btn-outline-success"
                        >
                          Continue Chat
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyChatsTeacher;
