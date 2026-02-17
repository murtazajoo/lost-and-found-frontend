export const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

export const fetchUser = async () => {
    const response = await fetch(
        `${REACT_APP_BACKEND_URL}/auth/status`,
        {
            credentials: "include",
        },
    );
    const data = await response.json();
    if (response.ok) {
        return data;
    }
};