import axios from "axios";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { NavLink, useLocation, useParams } from "react-router";
import { useUser } from "../context/userContext";
import useSocket from "../hook/useSocket";
import "./../styles/chat.css";

export default function Chat() {
    const { itemId, receiverId } = useParams();
    const location = useLocation();

    const [msg, setMsg] = useState("");
    const [messages, setMessages] = useState([]);
    const [room, setRoom] = useState({
        name: "",
        fetched: false,
    });
    const { user } = useUser();
    const { sendMessage, subscribeToRoom } = useSocket();

    useEffect(() => {
        if (!user || !room._id) return;
        subscribeToRoom(room._id, (data) => {
            setMessages((prev) => [...prev, data]);
        });
    }, [user, room]);

    useEffect(() => {
        const checkRoom = async () => {
            try {
                const res = await axios.post(
                    `/chat/rooms`,
                    {
                        name: `chat_${itemId}`,
                        members: [receiverId],
                        itemId,
                    },
                    {
                        withCredentials: true,
                    },
                );

                if (res.status === 200) {
                    setRoom({ ...res.data.room, fetched: true });
                    return res;
                }
                return false;
            } catch (err) {
                console.error(err);
                return false;
            }
        };

        if (user && !room.fetched) {
            checkRoom();
        }
    }, [itemId, user, room]);

    useEffect(() => {
        const updateReadStatus = async () => {
            try {
                await axios.put(
                    `/chat/rooms/${room._id}/read`,
                    {},
                    { withCredentials: true },
                );
            } catch (err) {
                console.error("Error updating read status:", err);
            }
        };
        if (room._id) {
            updateReadStatus();
        }

        const getMessages = async () => {
            try {
                const res = await axios.get(
                    `/chat/rooms/${room._id}/messages`,
                    {
                        withCredentials: true,
                    },
                );
                setMessages(res.data.messages.reverse());
            } catch (err) {
                console.error(err);
            }
        };
        if (room._id) {
            getMessages();
        }
    }, [room]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (msg && user) {
            sendMessage(
                msg,
                room._id,
                user.userId,
                room.members.find((m) => m._id !== user.userId)._id,
                itemId,
            );
            setMsg("");
        }
    };
    return (
        <div className="chat-container">
            <h1 className="chat-header">
                <NavLink to={`/inbox`} className="back-link">
                    <IoMdArrowBack />
                </NavLink>
                <img
                    src={room.itemId?.imageUrl || "/default-image.png"}
                    alt=""
                />
                <p>
                    {room.members?.find((m) => m._id !== user?.userId)?.name}
                    <span>
                        {room.itemId && (
                            <>
                                <NavLink
                                    to={`/item/${room.itemId._id}`}
                                    style={{
                                        color: "#008080",
                                    }}
                                >
                                    {room.itemId.itemName}
                                </NavLink>
                            </>
                        )}
                    </span>
                </p>
            </h1>
            <div
                className="messages-container"
                // Scroll to bottom at start
                ref={(el) => {
                    if (el) {
                        el.scrollTop = el.scrollHeight;
                    }
                }}
            >
                {messages.map((m, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={i}
                        className={`message ${
                            (m?.sender?._id ? m.sender._id : m.sender) ===
                            user?.userId
                                ? "message-sent"
                                : "message-received"
                        }`}
                    >
                        {m.content}
                    </motion.div>
                ))}
            </div>

            <form className="message-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="message-input"
                    placeholder="Type a message..."
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg}
                />
                <button className="send-button" type="submit">
                    Send
                </button>
            </form>
        </div>
    );
}
