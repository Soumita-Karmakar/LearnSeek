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
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
        <FaComments className="text-blue-600" />
        My Conversations
      </h2>

      {chats.length === 0 ? (
        <p className="text-center text-gray-700 text-lg">No conversations yet.</p>
      ) : (
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {chats.map((chat, idx) => {
            const otherUser =
              chat.senderId._id === user.id ? chat.receiverId : chat.senderId;
            const studentId = user.role === "Student" ? user.id : otherUser._id;
            const teacherId = user.role === "Student" ? otherUser._id : user.id;

            return (
              <div
                key={idx}
                className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <h5 className="text-xl font-semibold text-indigo-900">
                    {otherUser.name || "Unknown User"}
                  </h5>
                  <p className="text-gray-600 text-sm mt-1">
                    {chat.text || "No recent message"}
                  </p>
                </div>
                <Link
                  to={`/chat/${studentId}/${teacherId}`}
                  className="mt-4 self-start px-5 py-2 text-sm font-medium rounded-full border border-indigo-700 text-indigo-700 hover:bg-indigo-700 hover:text-white transition"
                >
                  Continue Chat
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyChats;
