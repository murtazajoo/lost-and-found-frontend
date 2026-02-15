import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { REACT_APP_BACKEND_URL } from "../utils";

export default function Test() {
    const [msg, setMsg] = useState("");
    const [r, setR] = useState("");
    const [userId, setUserId] = useState(null);
    const ioRef = useRef(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        ioRef.current = io(REACT_APP_BACKEND_URL);
        const user = async () => {
            const response = await fetch(
                `${REACT_APP_BACKEND_URL}/auth/status`,
                {
                    credentials: "include",
                },
            );
            const data = await response.json();
            if (response.ok) {
                setUserId(data.userId);
            } else {
                console.error("Failed to fetch user status:", data);
            }
        };
        user();
    }, []);

    useEffect(() => {
        if (ioRef.current) {
            const socket = ioRef.current;
            if (!r) return;
            socket.emit("joinRoom", r);

            socket.on("receive_message", (data) => {
                setMessages((prev) => [...prev, data]);
            });
        }
    }, [ioRef.current, r]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ioRef.current) {
            ioRef.current.emit("send_message", {
                message: msg,
                userId,
                room: r,
            });
            setMsg("");
        }
    };
    return (
        <div>
            <div>
                {messages.map((m, i) => (
                    <div key={i}>
                        {m.message}, {m.userId}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={r}
                onChange={(e) => setR(e.target.value)}
            />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Type a message..."
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}
