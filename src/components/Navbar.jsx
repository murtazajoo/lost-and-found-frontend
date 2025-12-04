import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { NavLink } from "react-router";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="navbar lora-400">
            <h2 className="brand">
                <a href="/">Findr</a>
            </h2>

            <div
                className="menu-toggle"
                onClick={() => setOpen((s) => !s)}
                aria-label="Toggle navigation"
                aria-expanded={open}
            >
                {open ? <RxCross1 /> : <GiHamburgerMenu size={25} />}
            </div>

            <div className={`nav-wrapper ${open ? "open" : ""}`}>
                <ul className="nav-links" role="menu">
                    <li role="none">
                        <NavLink
                            to="/"
                            onClick={() => setOpen(false)}
                            role="menuitem"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li role="none">
                        <NavLink
                            to="/items"
                            onClick={() => setOpen(false)}
                            role="menuitem"
                        >
                            Browse Items
                        </NavLink>
                    </li>
                    <li role="none">
                        <NavLink
                            to="/about"
                            onClick={() => setOpen(false)}
                            role="menuitem"
                        >
                            About
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
