import { useEffect } from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import foundPng from "../assets/found.png";
import lostPng from "../assets/lost.png";
import { REACT_APP_BACKEND_URL } from "../utils";

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
        </div>
    );
}
