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
                maxWidth: "800px",
                margin: "auto ",
                padding: "20px",
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
                                ) && <span className="active-indicator"></span>}

                                {chat.unreadBy &&
                                    chat.unreadBy.includes(user.userId) && (
                                        <span className="unread-indicator"></span>
                                    )}
                                <NavLink
                                    to={`/chat/${chat.itemId._id}`}
                                    // state={{
                                    //     receiver: {
                                    //         _id: chat.members.find(
                                    //             (m) => m._id !== user.userId,
                                    //         )._id,
                                    //     },
                                    //     item: chat.itemId,
                                    // }}
                                >
                                    Chat with{" "}
                                    {
                                        chat.members.find(
                                            (m) => m._id !== user.userId,
                                        ).name
                                    }
                                    <br />
                                    <span
                                        style={{
                                            fontSize: "14px",
                                            opacity: "0.6",
                                        }}
                                    >
                                        Item:
                                        {chat.itemId &&
                                            ` (${chat.itemId.itemName})`}
                                    </span>
                                </NavLink>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}
