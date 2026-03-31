import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TeacherMyChat = () => {
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
    <div className="min-h-screen bg-gradient-to-r from-lime-50 to-cyan-50">
      <div className="container mx-auto py-12 px-4">
        <h3 className="text-center mb-8 text-blue-700 font-bold text-2xl">💬 My Conversations</h3>

        {chats.length === 0 ? (
          <p className="text-center text-gray-500">No conversations yet.</p>
        ) : (
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <div className="space-y-4">
                {chats.map((chat, idx) => {
                  const otherUser =
                    chat.senderId._id === user.id ? chat.receiverId : chat.senderId;

                  return (
                    <div
                      key={idx}
                      className="bg-white/90 shadow-md rounded-lg p-4 flex justify-between items-center"
                    >
                      <div>
                        <h5 className="text-lg font-semibold text-gray-800">👤 {otherUser.name}</h5>
                        <p className="text-gray-600 text-sm">
                          {chat.text || "Start the conversation..."}
                        </p>
                      </div>
                      <Link
                        to={`/chat/${user.role === "Teacher" ? user.id : otherUser._id}/${user.role === "Teacher" ? otherUser._id : user.id}`}
                        className="px-3 py-1 text-sm border border-green-500 text-green-700 rounded hover:bg-green-50 transition"
                      >
                        Continue Chat
                      </Link>
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

export default TeacherMyChat;
