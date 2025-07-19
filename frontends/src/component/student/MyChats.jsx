import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyChats = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/conversations/${user.id}/${user.role}`);
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
    <div className="container mt-4">
      <h2 className="text-center">My Chats</h2>
      {chats.length === 0 ? (
        <p>No conversations yet.</p>
      ) : (
        <ul className="list-group">
          {chats.map((chat, idx) => {
            const otherUser =
              chat.senderId._id === user.id ? chat.receiverId : chat.senderId;
            const studentId = user.role === "Student" ? user.id : otherUser._id;
            const teacherId = user.role === "Student" ? otherUser._id : user.id;

            return (
              <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{otherUser.name || "Unknown User"}</strong>
                  <br />
                  <small className="text-muted">{chat.text}</small>
                </div>
                <Link
                  to={`/chat/${studentId}/${teacherId}`}
                  className="btn btn-outline-primary"
                >
                  Continue Chat
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MyChats;
