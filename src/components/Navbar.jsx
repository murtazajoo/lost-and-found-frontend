export default function Navbar() {
    return (
        <div
            style={{
                height: "60px",
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
                fontSize: "24px",
                fontWeight: "bold",
                borderBottom: "1px solid #000",
            }}
            className="lora-400"
        >
            <h2>
                <a href="/">Findr </a>
            </h2>
        </div>
    );
}
