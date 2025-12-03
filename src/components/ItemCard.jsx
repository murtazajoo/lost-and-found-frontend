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
