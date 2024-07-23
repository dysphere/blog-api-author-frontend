import { createContext } from "react";

export const UserContext = createContext({
    token: "",
    user: false,
    addToken: () => {},
    removeToken: () => {},
});