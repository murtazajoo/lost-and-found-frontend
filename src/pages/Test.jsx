import { useEffect, useRef, useState } from "react";
import { useUser } from "../context/userContext";
import useSocket from "../hook/useSocket";

export default function Test() {
    const [msg, setMsg] = useState("");
    const [r, setR] = useState("");
    const [userId, setUserId] = useState(null);
    const ioRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const { user } = useUser();
    const { sendMessage, subscribeToRoom } = useSocket();

    useEffect(() => {
        if (!r) return;
        subscribeToRoom(r, (data) => {
            setMessages((prev) => [...prev, data]);
        });
    }, [r]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (msg && r) {
            sendMessage(msg, r, user.userId, "6990a568eb905e32bd67f324");
            setMsg("");
        }
    };
    return (
        <div>
            {JSON.stringify(user)}
            <div>
                {messages.map((m, i) => (
                    <div key={i}>
                        {m.content}, {m.sender}, {m.receiver}
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
