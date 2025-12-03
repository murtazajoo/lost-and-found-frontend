import { useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router";
import "../styles/Login.css";
import { REACT_APP_BACKEND_URL } from "../utils";

export default function Login() {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const [loggingIn, setLoggingIn] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoggingIn(true);
        const response = await fetch(`${REACT_APP_BACKEND_URL}/auth/login`, {
            method: "POST",
            credentials: "include",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
            console.log("Login successful:", data);
            toast.success("Login successful!");
            navigate("/");
        } else {
            console.error("Login failed:", data);
            toast.error(data.message || "Login failed");
        }
        setLoggingIn(false);
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        onChange={handleInputChange}
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="login-input"
                        required
                    />
                    <input
                        onChange={handleInputChange}
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="login-input"
                        required
                    />
                    <button type="submit" className="login-button">
                        {loggingIn ? (
                            "Logging in..."
                        ) : (
                            <>
                                Login <IoIosArrowRoundForward size={30} />
                            </>
                        )}
                    </button>
                </form>
                <p
                    style={{
                        marginTop: "20px",
                    }}
                >
                    Don't have an account?{" "}
                    <a href="/auth/register" style={{ color: "#0b3d91" }}>
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
}
