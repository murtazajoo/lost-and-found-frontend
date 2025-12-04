import { GoDotFill } from "react-icons/go";

export default function About() {
    return (
        <div
            style={{
                maxWidth: "800px",
                margin: "0 auto ",
            }}
        >
            <h1
                className="lora-400"
                style={{
                    fontSize: "2rem",
                    marginTop: "20px",
                    padding: "10px",
                }}
            >
                About Findr
            </h1>
            <br />
            <div
                style={{
                    fontSize: "1.2rem",
                    lineHeight: "1.6",
                    padding: "0 10px",
                }}
            >
                <p>
                    Findr is a lost and found platform designed to help users
                    report and locate lost or found items within their
                    community. Our mission is to make it easier for people to
                    reunite with their belongings and assist others in finding
                    items they may have lost.
                </p>
                <br />

                <p>
                    Whether you've misplaced your wallet, keys, or any other
                    valuable item, Findr provides a simple and efficient way to
                    report it. Users can also browse reported items to help
                    others recover their lost possessions.
                </p>
                <br />

                <p>
                    We believe in fostering a supportive community where people
                    can come together to help one another. Thank you for using
                    Findr!
                </p>
            </div>
            <br />
            <hr />
            <br />
            <h1
                className="lora-400"
                style={{
                    fontSize: "1.6rem",
                    marginTop: "20px",
                    padding: "10px",
                }}
            >
                How to Use Findr
            </h1>
            <br />
            <div
                style={{
                    fontSize: "1.2rem",
                    lineHeight: "1.6",
                    padding: "0 10px",
                }}
            >
                <p>
                    To report a lost or found item, simply navigate to the
                    "Report Item" page, fill out the required details, and
                    submit the form. Make sure to provide accurate information
                    to help others identify the item.
                </p>
                <br />
                <p>
                    To browse reported items, go to the "Browse Items" page. You
                    can filter items by "Lost" or "Found" and use the search bar
                    to find specific items.
                </p>
            </div>
            <br />
            <hr />
            <br />
            <h1
                className="lora-400"
                style={{
                    fontSize: "1.6rem",
                    marginTop: "20px",
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "8px",
                }}
            >
                Made with ❤️ by the <GoDotFill size={10} /> <b>Murtaza</b>{" "}
                <GoDotFill size={10} /> <b> Adil</b>
                <GoDotFill size={10} /> <b>Suhaib</b>
            </h1>
            <br />
            <br />
            <br />
        </div>
    );
}
