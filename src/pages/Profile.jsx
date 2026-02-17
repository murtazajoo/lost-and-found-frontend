import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { useUser } from "../context/userContext";
import "./../styles/profile.css";

export default function Profile() {
    const { user, loading, error } = useUser();
    const [myItems, setMyItems] = useState([]);

    const getMyItems = async () => {
        if (!user || !user._id) return;
        try {
            const res = await axios.get("/item/my", {
                withCredentials: true,
            });
            setMyItems(res.data.items);
        } catch (err) {
            console.error("Error fetching my items:", err);
        }
    };

    const logout = async () => {
        try {
            const response = await axios.get(
                "/auth/logout",
                {},
                { withCredentials: true },
            );
            if (response.status === 200) {
                window.location.href = "/auth/login";
            } else {
                console.error("Logout failed:", response);
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    useEffect(() => {
        if (user && user._id && myItems.length === 0) {
            getMyItems();
        }
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div className="profile-page">
            <h1 className="profile-title">My Profile</h1>
            <p className="profile-info">Name: {user.name}</p>
            <p className="profile-info">Email: {user.email}</p>
            <p className="profile-info">Items: {myItems.length}</p>
            <button onClick={logout}>Logout</button>
            <div className="profile-items-section">
                <h2 className="profile-subtitle">My Reported Items</h2>
                {myItems.length === 0 ? (
                    <p>You haven't reported any items yet.</p>
                ) : (
                    <ul className="profile-items-list">
                        {myItems.map((item) => (
                            <NavLink
                                to={`/item/${item._id}`}
                                key={item._id}
                                className="profile-item-card"
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.itemName}
                                    className="profile-item-image"
                                />
                                <div>
                                    <h3 className="profile-item-name">
                                        {item.itemName}
                                    </h3>
                                    <p className="profile-item-status">
                                        Status:{" "}
                                        {item.claimed ? "Claimed" : "Unclaimed"}
                                    </p>
                                    <p className="profile-item-status">
                                        Type: {item.type}
                                    </p>
                                </div>
                            </NavLink>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
