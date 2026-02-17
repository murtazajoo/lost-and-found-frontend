import { useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router";
import "../styles/Login.css";
import { REACT_APP_BACKEND_URL } from "../utils";

export default function Register() {
    const [formData, setFormData] = useState({});
    const [otp, setOtp] = useState("");
    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };
    const [formState, setFormState] = useState("password"); // "otp" or "password"
    const navigate = useNavigate();
    const [registering, setRegistering] = useState(false);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const sendOTP = async () => {
        const response = await fetch(`${REACT_APP_BACKEND_URL}/mail/otp/send`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: formData.email }),
        });
        const data = await response.json();
        if (response.ok) {
            toast.success("OTP sent to your email.");
            return true;
        } else {
            toast.error(data.message || "Failed to send OTP.");
            setFormState("password");
            return false;
        }
    };

    const verifyOTP = async () => {
        const response = await fetch(
            `${REACT_APP_BACKEND_URL}/mail/otp/verify`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: formData.email, otp: otp }),
            },
        );
        const data = await response.json();
        if (response.ok) {
            toast.success("OTP verified.");
            return true;
        } else {
            toast.error(data.message || "OTP verification failed.");
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRegistering(true);
        if (formState === "password") {
            const sent = await sendOTP();
            if (!sent) {
                setRegistering(false);
                return;
            }
            setFormState("otp");
            setRegistering(false);
            return;
        }

        const verified = await verifyOTP();
        if (!verified) {
            setRegistering(false);
            return;
        }

        const response = await fetch(`${REACT_APP_BACKEND_URL}/auth/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
            // Registration successful
            toast.success("Registration successful! Please log in.");
            navigate("/auth/login");
        } else {
            // Handle errors
            console.error("Registration failed:", data);
            toast.error(data.message || "Registration failed");
        }
        setRegistering(false);
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2 className="login-title">Register</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    {formState == "password" && (
                        <>
                            <input
                                type="text"
                                onChange={handleInputChange}
                                name="name"
                                placeholder="Name"
                                className="login-input"
                                required
                            />
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
                                {registering ? (
                                    "Registering..."
                                ) : (
                                    <>
                                        Register{" "}
                                        <IoIosArrowRoundForward size={30} />
                                    </>
                                )}
                            </button>
                        </>
                    )}

                    {formState == "otp" && (
                        <>
                            <p>
                                <label htmlFor="otp">Enter OTP</label>
                            </p>
                            <small>
                                An OTP has been sent to your email address.
                            </small>
                            <input
                                type="number"
                                onChange={handleOtpChange}
                                name="otp"
                                placeholder="Enter OTP"
                                className="login-input"
                                required
                            />
                            <button type="submit" className="login-button">
                                {registering ? (
                                    "sending..."
                                ) : (
                                    <>
                                        Verify OTP{" "}
                                        <IoIosArrowRoundForward size={30} />
                                    </>
                                )}
                            </button>
                        </>
                    )}
                </form>

                <p
                    style={{
                        marginTop: "20px",
                    }}
                >
                    Already have an account?{" "}
                    <a href="/auth/login" style={{ color: "#0b3d91" }}>
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
}
