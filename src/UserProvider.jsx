import { useState } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(false);

    async function addToken(data) {
        try {
        let response = await fetch("https://blog-api-backend.fly.dev/blog/author-log-in",
            {   method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: data,
                mode: "cors"});
            const jwt_data = await response.json();
            const jwt_token = jwt_data.token;
            setUser(true);
            localStorage.setItem("jwt_token", jwt_token);
            }
        catch (error) {
            console.error("Error:", error);
        }
    }

    function removeToken() {
        setUser(false);
        localStorage.removeItem("jwt_token");
    }


    return (
        <UserContext.Provider value={{ user, addToken, removeToken}}>
            {children}
        </UserContext.Provider>
    )
}