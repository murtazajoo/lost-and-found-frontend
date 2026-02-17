import axios from "axios";
import React, { useEffect } from "react";
import { NavLink } from "react-router";
import { useUser } from "../context/userContext";
import useSocket from "../hook/useSocket";
import "./../styles/chat.css";

export default function Inbox() {
    const [chats, setChats] = React.useState([]);
    const { user } = useUser(); // Assuming useUser is a custom hook that returns user data
    const { subscribe } = useSocket();
    const [activeUsers, setActiveUsers] = React.useState([]);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const res = await axios.get("/chat/rooms", {
                    withCredentials: true,
                });
                setChats(res.data.rooms.reverse());
            } catch (err) {
                console.error("Error fetching chats:", err);
            }
        };
        fetchChats();
        subscribe("activeUsers", (users) => {
            setActiveUsers(users);
        });
    }, []);

    return (
        <div
            style={{
                background: "#ffc1aaad",
                minHeight: "calc(100svh - 60px)",
            }}
        >
            <div
                style={{
                    padding: "20px",
                    margin: "auto ",

                    maxWidth: "800px",
                }}
            >
                <h1>Inbox</h1>
                {chats.length === 0 ? (
                    <p>No chats yet.</p>
                ) : (
                    <ul
                        style={{
                            margin: "20px 0 0 0px ",
                        }}
                    >
                        {user &&
                            chats.map((chat) => (
                                <li key={chat._id} className="inbox-item">
                                    {activeUsers.includes(
                                        chat.members.find(
                                            (m) => m._id !== user.userId,
                                        )._id,
                                    ) && (
                                        <span className="active-indicator"></span>
                                    )}

                                    {chat.unreadBy &&
                                        chat.unreadBy.includes(user.userId) && (
                                            <span className="unread-indicator"></span>
                                        )}
                                    <NavLink
                                        to={`/chat/${chat.itemId._id}/${
                                            chat.members.find(
                                                (m) => m._id !== user.userId,
                                            )._id
                                        }`}
                                        className={"inbox-item-link"}
                                    >
                                        <img
                                            src={
                                                chat.itemId.imageUrl ||
                                                "/default-image.png"
                                            }
                                            alt=""
                                        />
                                        <div>
                                            {
                                                chat.members.find(
                                                    (m) =>
                                                        m._id !== user.userId,
                                                ).name
                                            }
                                            <br />
                                            <span
                                                style={{
                                                    fontSize: "14px",
                                                    opacity: "0.6",
                                                }}
                                            >
                                                {chat.itemId &&
                                                    ` (${chat.itemId.itemName})`}
                                            </span>
                                        </div>
                                    </NavLink>
                                </li>
                            ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
