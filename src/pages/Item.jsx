import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { LuMessageCircleMore } from "react-icons/lu";
import { NavLink, useNavigate, useParams } from "react-router";
import { useUser } from "../context/userContext";
import { REACT_APP_BACKEND_URL } from "../utils";

export default function Item() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();

    const handleClaim = async () => {
        const response = await fetch(
            `${REACT_APP_BACKEND_URL}/item/${id}/claimed`,
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        const data = await response.json();
        if (response.ok) {
            setItem((prevItem) => ({
                ...prevItem,
                claimed: true,
            }));
        } else {
            console.error("Failed to mark item as claimed:", data);
        }
    };

    const navigate = useNavigate();
    useEffect(() => {
        async function fetchItem() {
            setLoading(true);
            const response = await fetch(`${REACT_APP_BACKEND_URL}/item/${id}`);
            const data = await response.json();
            if (response.ok) {
                setItem(data.item);
            } else {
                console.error("Failed to fetch item:", data);
            }
            setLoading(false);
        }
        fetchItem();
    }, [id]);

    if (loading) {
        return (
            <p style={{ textAlign: "center", fontSize: "2rem" }}>Loading...</p>
        );
    }

    if (!item && !loading) {
        return (
            <p style={{ textAlign: "center", fontSize: "2rem" }}>
                Item not found.
            </p>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.5, delay: 1 },
            }}
            exit={{ opacity: 0 }}
        >
            <button
                className="go-back-button"
                onClick={() => navigate("/items")}
                style={{
                    margin: "10px",
                }}
            >
                <IoIosArrowRoundBack size={30} /> View All Items
            </button>
            <div className="item-container">
                <div className="item-img">
                    <img src={item.imageUrl} alt={item.itemName} />
                </div>
                <div className="item-details">
                    <h2
                        style={{
                            textTransform: "capitalize",
                            fontWeight: "normal",
                            fontSize: "20px",
                            color: item.type === "lost" ? "red" : "green",
                        }}
                    >
                        I{" "}
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}{" "}
                        :
                    </h2>
                    <h1 className="lora-400">{item.itemName}</h1>
                    <p
                        style={{
                            fontSize: "1.2rem",
                            color: "#2c2c2f",
                            marginBottom: "20px",
                        }}
                    >
                        {item.description}
                    </p>
                    <p>Owner ID: {item.userId._id}</p>
                    <p>Date: {new Date(item.date).toDateString()}</p>
                    <p>Location: {item.location}</p>
                    {item.email && <p>Email: {item.email}</p>}
                    {item && item.whatsAppNumber && (
                        <a
                            href={`https://wa.me/${item.whatsAppNumber}?text=Hello%20I%20am%20contacting%20you%20regarding%20the%20${item.itemName}%20you%20reported%20as%20${item.type}.`}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                width: "fit-content",
                            }}
                        >
                            <button>
                                <FaWhatsapp color="green" size={30} />
                                Contact via WhatsApp
                            </button>
                        </a>
                    )}
                    {user && user._id !== item.userId._id && (
                        <NavLink
                            to={`/chat/${item._id}`}
                            state={{ item, receiver: item.userId }}
                        >
                            <button>
                                <LuMessageCircleMore />
                                Chat with Owner
                            </button>
                        </NavLink>
                    )}

                    <div className="flex items-center ">
                        {item.claimed ? (
                            <p
                                style={{
                                    color: "green",
                                    fontWeight: "bold",
                                }}
                            >
                                {" "}
                                Item has been claimed.
                            </p>
                        ) : (
                            user &&
                            user._id === item.userId._id && (
                                <button
                                    onClick={handleClaim}
                                    style={{
                                        margin: 0,
                                    }}
                                >
                                    Mark as Claimed
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
