import { createContext } from "react";

export const NavigationContext = createContext(null);



export type NavList = {
    Login: undefined,
    SignUp: undefined;
    Main: undefined;
    Family: undefined;
    Posts: undefined;
    Mentions: undefined;
}