import { createContext, useContext, useEffect, useState } from "react";
import { fetchUser } from "../utils";

const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const updateUser = (newUser) => {
        setUser(newUser);
    };

    useEffect(() => {
        fetchUser()
            .then((data) => {
                setUser(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []);

    return (
        <UserContext.Provider value={{ user, updateUser, loading, error }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserContextProvider");
    }
    return context;
};
