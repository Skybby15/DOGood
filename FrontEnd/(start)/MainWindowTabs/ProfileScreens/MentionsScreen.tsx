import { View, Text, Dimensions } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useEffect } from "react";

const { width } = Dimensions.get("window");

export default function MentionsScreen() {
    const isFocused = useIsFocused();
    const translateX = useSharedValue(+width);

    useEffect(() => {
        if (isFocused) {
            translateX.value = withTiming(0, { duration: 100 });
        } else {
            translateX.value = +width;
        }
    }, [isFocused]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <Animated.View style={[{ flex: 1, alignItems: "center", justifyContent: "center" }, animatedStyle]}>
            <Text>Mentions</Text>
        </Animated.View>
    );
}