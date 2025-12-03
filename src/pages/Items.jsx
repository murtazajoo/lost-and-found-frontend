import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ItemCard from "../components/ItemCard";
import { REACT_APP_BACKEND_URL } from "../utils";

export default function Items() {
    const [filter, setFilter] = useState("lost");
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {
        const lowercasedTerm = searchTerm.toLowerCase();
        const filtered = items.filter(
            (item) =>
                item.itemName.toLowerCase().includes(lowercasedTerm) ||
                item.description.toLowerCase().includes(lowercasedTerm) ||
                item.location.toLowerCase().includes(lowercasedTerm)
        );
        setFilteredItems(filtered);
    }, [searchTerm, items]);

    useEffect(() => {
        async function fetchItems() {
            setLoading(true);
            const response = await fetch(
                `${REACT_APP_BACKEND_URL}/item/${filter}`
            );
            const data = await response.json();
            if (response.ok) {
                setItems(data.items);
                setFilteredItems(data.items);
            } else {
                console.error("Failed to fetch items:", data);
            }
            setLoading(false);
        }
        fetchItems();
    }, [filter]);

    return (
        <div>
            <div className="filter-container">
                <div
                    className="filter-bg"
                    style={{
                        transform: `translateX(${
                            filter === "lost" ? "0" : "100%"
                        })`,
                        backgroundColor: "#2c2c2f",
                    }}
                ></div>
                <div className="filter-in-con">
                    <div
                        style={{
                            color: filter === "lost" ? "white" : "#2c2c2f",
                        }}
                        onClick={() => setFilter("lost")}
                    >
                        LOST
                    </div>
                    <div
                        style={{
                            color: filter === "found" ? "white" : "#2c2c2f",
                        }}
                        onClick={() => setFilter("found")}
                    >
                        FOUND
                    </div>
                </div>
                <div className="search">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="items-list">
                {loading && (
                    <p style={{ textAlign: "center", fontSize: "2rem" }}>
                        Loading...
                    </p>
                )}
                {!loading &&
                    (filteredItems.length > 0 ? (
                        filteredItems.map((item, index) => (
                            <ItemCard key={index} item={item} />
                        ))
                    ) : (
                        <p style={{ textAlign: "center", fontSize: "2rem" }}>
                            No items found.
                        </p>
                    ))}
            </div>
        </div>
    );
}
