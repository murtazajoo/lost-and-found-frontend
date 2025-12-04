import { useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import foundPng from "../assets/found.png";
import lostPng from "../assets/lost.png";
import { REACT_APP_BACKEND_URL } from "../utils";
import Items from "./Items";

export default function Home() {
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(REACT_APP_BACKEND_URL);
            const data = await response.json();
            console.log(data);
        }
        fetchData();
    }, []);

    return (
        <div>
            <div className="hero-con">
                <div className="hero-text hero-lost">
                    <div>
                        <h1 className="lora-400">Lost Something?</h1>
                        <p>Find it with Findr</p>
                        <br />
                        <div className="hero-flex">
                            <img src={lostPng} alt="Lost something" />
                            <a href="/report/lost">
                                <button>
                                    I Lost an Item
                                    <IoIosArrowRoundForward size={30} />
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="hero-text hero-found">
                    <div>
                        <h1 className="lora-400">Found Something?</h1>
                        <p>Help others find it with Findr</p>
                        <br />{" "}
                        <div className="hero-flex right mobile-rev">
                            <a href="/report/found">
                                <button>
                                    {" "}
                                    <IoIosArrowRoundBack size={30} />I Found an
                                    Item
                                </button>
                            </a>
                            <img src={foundPng} alt="Lost something" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="cta">
                <h2 className="lora-400">Browse Lost and Found Items</h2>
                <a href="/items">
                    <button>
                        View Items <IoIosArrowRoundForward size={30} />
                    </button>
                </a>
            </div>
            <div>
                {/* steps */}
                <div className="steps-con">
                    <h2 className="lora-400">How It Works</h2>
                    <div className="steps-grid">
                        <div className="step-card">
                            <h3>1. Report</h3>
                            <p>
                                Report lost or found items by providing details
                                and uploading images.
                            </p>
                        </div>
                        <div className="step-card">
                            <h3>2. Browse</h3>
                            <p>
                                Browse reported items to find matches for your
                                lost or found belongings.
                            </p>
                        </div>
                        <div className="step-card">
                            <h3>3. Connect</h3>
                            <p>
                                Contact the reporter to arrange the return or
                                claim of the item.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Items home={true} />
            <div
                className="cta "
                style={{
                    backgroundColor: "#f0f0f0",
                }}
            >
                <h2 className="lora-400">Browse All Items</h2>
                <a href="/items">
                    <button>View All</button>
                </a>
            </div>

            <br />
            <hr />
            <br />
            <h1
                className="lora-400"
                style={{
                    fontSize: "1rem",
                    marginTop: "20px",
                    textAlign: "center",
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
