import { View, Text, Dimensions } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useContext, useEffect } from "react";
import ProfileContext from "../ProfileContext";

const { width } = Dimensions.get("window");

export default function PostsScreen() {
    const isFocused = useIsFocused();
    const translateX = useSharedValue(+width);

    const {tabSelected} = useContext(ProfileContext);

    useEffect(() => {
        if (isFocused) {
            translateX.value = withTiming(0, { duration: 100 });
        }
    }, [isFocused]);

    useEffect(()=>{
        if(tabSelected === 'Family')
            translateX.value = +width;
        else if(tabSelected === 'Mentions')
            translateX.value = -width;
    },[tabSelected])

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <Animated.View style={[{ flex: 1, alignItems: "center", justifyContent: "center" }, animatedStyle]}>
            <Text>Posts</Text>
        </Animated.View>
    );
}