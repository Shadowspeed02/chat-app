import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});
  const { socket, axios } = useContext(AuthContext);

  // function to get all users for sidebar
  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/messages/users");
      if (data?.success) {
        setUsers(Array.isArray(data.users) ? data.users.filter(Boolean) : []);
        setUnseenMessages(data.unseenMessages || {});
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // functions to get messages for selected user
  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      console.log("datagetmessage", data);
      if (data?.success) {
        const safe = Array.isArray(data.messages) ? data.messages.filter(Boolean) : [];
        setMessages(safe);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // function to send message to selected user
  const sendMessage = async (messageData) => {
    try {
      const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData);
      console.log("data", data);

      if (data?.success) {
        const newMsg = data.newMessage;
        if (!newMsg || typeof newMsg !== "object") {
          // Don't append invalid message
          console.warn("sendMessage: received invalid newMessage from server:", newMsg, data);
          toast.error("Server returned invalid message");
          return;
        }

        // ensure createdAt exists so UI won't show "Invalid Date"
        if (!newMsg.createdAt) newMsg.createdAt = new Date().toISOString();

        setMessages((prevMessages) => [...prevMessages, newMsg]);
      } else {
        toast.error(data?.message || "Failed to send message");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // socket subscription for incoming messages (listener per effect, cleaned up properly)
  useEffect(() => {
    if (!socket) return;

    const handler = (incoming) => {
      // some backends wrap payload as { message: {...} } or send message object directly
      const newMessage = incoming?.message ?? incoming;

      if (!newMessage || typeof newMessage !== "object") {
        console.warn("socket: ignoring invalid newMessage payload", incoming);
        return;
      }

      // default createdAt if missing (prevents Invalid Date)
      if (!newMessage.createdAt) newMessage.createdAt = new Date().toISOString();

      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        // best-effort mark-as-seen; catch errors to avoid uncaught rejections
        axios
          .put(`/api/messages/mark/${newMessage._id}`)
          .catch((err) => console.error("mark message error:", err));
      } else {
        setUnseenMessages((prevUnseenMessages) => ({
          ...prevUnseenMessages,
          [newMessage.senderId]: prevUnseenMessages[newMessage.senderId]
            ? prevUnseenMessages[newMessage.senderId] + 1
            : 1,
        }));
      }
    };

    socket.on("newMessage", handler);

    // cleanup exact handler on unmount / dependency change
    return () => {
      socket.off("newMessage", handler);
    };
  }, [socket, selectedUser, axios]);

  const value = {
    messages,
    users,
    selectedUser,
    getUsers,
    getMessages,
    sendMessage,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
