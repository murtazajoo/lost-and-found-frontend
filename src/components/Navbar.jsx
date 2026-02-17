import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { NavLink } from "react-router";
import { useUser } from "../context/userContext";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { user, updateUser, loading, error } = useUser();

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
                    {user && (
                        <li role="none">
                            <NavLink
                                to="/inbox"
                                onClick={() => setOpen(false)}
                                role="menuitem"
                            >
                                Inbox
                            </NavLink>
                        </li>
                    )}
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
                    <li role="none">
                        {!loading && !user ? (
                            <NavLink
                                to="/auth/login"
                                onClick={() => setOpen(false)}
                                role="menuitem"
                            >
                                login
                            </NavLink>
                        ) : (
                            <NavLink
                                to="/me"
                                onClick={() => setOpen(false)}
                                role="menuitem"
                            >
                                My Profile
                            </NavLink>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}
