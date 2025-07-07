import { Dimensions } from "react-native";

const { width,height } = Dimensions.get("window");

export type NavList = {
    Login: undefined,
    SignUp: undefined;
    Main: undefined;
    Family: undefined;
    Posts: undefined;
    Mentions: undefined;
}

export const Width = width;
export const Height = height;