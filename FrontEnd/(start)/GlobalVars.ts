import { Dimensions, SafeAreaView } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createRef } from "react";

const { width,height } = Dimensions.get("window");

const unsafeAreasRef = createRef<SafeAreaView>();

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

export const UnsafeAreasRef = unsafeAreasRef;

export const SetUnsafeAreaBackgroundColor = function(color : string){ unsafeAreasRef.current.setNativeProps({style : {backgroundColor : color}}) }

export let FirebaseToken : string = "";

export function SetFirebaseToken(token)
{
    FirebaseToken = token;
}

export function ClearFirebaseToken()
{
    FirebaseToken = "";
}