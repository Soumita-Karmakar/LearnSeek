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
    <div className="container mt-4">
      <h3 className="text-center">My Chats</h3>
      {chats.length === 0 ? (
        <p>No conversations yet.</p>
      ) : (
        <ul className="list-group">
          {chats.map((chat, idx) => {
            const otherUser =
              chat.senderId._id === user.id ? chat.receiverId : chat.senderId;

            return (
              <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>Chat with: {otherUser.name}</strong><br />
                  <small className="text-muted">{chat.text}</small>
                </div>
                <Link
                  to={`/chat/${user.role === "Teacher" ? user.id : otherUser._id}/${user.role === "Teacher" ? otherUser._id : user.id}`}
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

export default MyChatsTeacher;
