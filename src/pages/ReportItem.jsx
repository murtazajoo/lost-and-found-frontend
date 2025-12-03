import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router";
import { REACT_APP_BACKEND_URL } from "../utils";

export default function ReportItem({ type }) {
    const init = {
        itemName: "",
        description: "",
        date: "",
        location: "",
        whatsAppNumber: "",
        email: "",
    };
    const [itemData, setItemData] = useState(init);
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setItemData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const uploadImage = () => {
        if (!file) {
            toast.error("Please select an image to upload.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size exceeds 5MB limit.");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

        return formData;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: uploadImage(),
            }
        );

        const d = await res.json();

        if (!d.secure_url) {
            toast.error("Upload failed. Please try again.");
        }

        const response = await fetch(`${REACT_APP_BACKEND_URL}/item/add`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...itemData,
                type: type,
                imageUrl: d.secure_url,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            console.log("Report submitted successfully:", data);
            toast.success("Report submitted successfully!");
            setItemData(init);
            navigate("/item/" + data.item._id);
        } else {
            console.error("Report submission failed:", data);
            toast.error(data.message || "Report submission failed");
        }
        setSubmitting(false);
    };

    useEffect(() => {
        const fetchuser = async () => {
            const response = await fetch(
                `${REACT_APP_BACKEND_URL}/auth/status`,
                {
                    credentials: "include",
                }
            );
            const data = await response.json();
            if (!response.ok) {
                navigate("/auth/login");
            } else {
                setLoading(false);
            }
        };
        fetchuser();
    }, []);

    if (loading) {
        return <div className="flex mih-h report-item">Loading...</div>;
    }
    return (
        <div className="flex mih-h report-item">
            <div
                className="first-title"
                style={{
                    flex: 1,
                }}
            >
                <h2 className="lora-400">
                    Report{" "}
                    <span
                        style={{
                            color: type === "lost" ? "red" : "green",
                        }}
                    >
                        {" "}
                        {type === "lost" ? "Lost" : "Found"}{" "}
                    </span>{" "}
                    Item
                </h2>

                <p>
                    Please fill out the form to report your{" "}
                    {type === "lost" ? "lost" : "found"} item.
                </p>

                {/* some instructions */}
                <p>
                    Make sure to provide accurate details to help others
                    identify the item.
                </p>
            </div>
            <div className="item-form-con">
                <br />
                <form onSubmit={handleSubmit} className="item-form">
                    <p>
                        <label htmlFor="itemName">Item Name</label>
                        <input
                            type="text"
                            id="itemName"
                            placeholder="Item Name"
                            name="itemName"
                            onChange={handleInputChange}
                            value={itemData.itemName}
                            required
                        />
                    </p>

                    <p>
                        <label htmlFor="itemDescription">
                            Item Description
                        </label>
                        <textarea
                            id="itemDescription"
                            placeholder="Describe the item..."
                            name="description"
                            onChange={handleInputChange}
                            value={itemData.description}
                            required
                        ></textarea>
                    </p>
                    <p>
                        <label htmlFor="itemImage">Item Image URL</label>
                        <input
                            type="file"
                            id="itemImage"
                            name="image"
                            onChange={(e) => setFile(e.target.files[0])}
                            placeholder="Image URL"
                            required
                        />
                    </p>
                    <p>
                        <label htmlFor="itemDate">
                            Date {type === "lost" ? "Lost" : "Found"}
                        </label>
                        <input
                            type="date"
                            id="itemDate"
                            required
                            name="date"
                            onChange={handleInputChange}
                            value={itemData.date}
                        />
                    </p>
                    <p>
                        <label htmlFor="itemLocation">
                            Location {type === "lost" ? "Lost" : "Found"}
                        </label>
                        <input
                            type="text"
                            id="itemLocation"
                            placeholder="Location"
                            name="location"
                            onChange={handleInputChange}
                            value={itemData.location}
                            required
                        />
                    </p>
                    <p>
                        <label htmlFor="whatsapp">WhatsApp</label>
                        <input
                            type="text"
                            id="whatsapp"
                            placeholder="Your WhatsApp number"
                            name="whatsAppNumber"
                            onChange={handleInputChange}
                            value={itemData.whatsAppNumber}
                            required
                        />
                    </p>

                    <p>
                        <label htmlFor="email"> Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleInputChange}
                            value={itemData.email}
                            placeholder="Your email address"
                        />
                    </p>

                    <button type="submit" disabled={submitting}>
                        {submitting ? (
                            "Submitting..."
                        ) : (
                            <>
                                Submit Report{" "}
                                <IoIosArrowRoundForward size={30} />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
