import { Dimensions } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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

export const Wp = wp;
export const Hp = hp;

export const ModerateS = moderateScale;
export const VerticalS = verticalScale;