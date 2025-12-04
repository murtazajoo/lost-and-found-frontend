import { IoIosArrowRoundForward } from "react-icons/io";

export default function ItemCard({ item }) {
    return (
        <div
            className="item-card"
            style={{
                borderColor: item.type === "lost" ? "#571414ff " : "green",
            }}
        >
            <img src={item.imageUrl} alt={item.itemName} />
            <div
                style={{
                    border: "1px solid " + (item.claimed ? "green" : "red"),
                    color: item.claimed ? "green" : "red",
                    width: "fit-content",
                    padding: "2px 8px",
                    borderRadius: "5px",
                    marginBottom: "10px",
                    fontSize: "12px",
                }}
            >
                {item.claimed ? "Claimed" : "Not Claimed"}
            </div>
            <div>
                <h2 className="lora-400">{item.itemName}</h2>
                <p className="line-clamp">{item.description}</p>
                <a href={`/item/${item._id}`}>
                    <button>
                        View Details
                        <IoIosArrowRoundForward size={30} />
                    </button>
                </a>
            </div>
        </div>
    );
}
