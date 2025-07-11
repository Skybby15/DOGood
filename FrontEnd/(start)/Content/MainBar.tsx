import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { Width, Height, ModerateS, Wp, Hp } from "../GlobalVars";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Svg, { Circle } from "react-native-svg";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

// Container height as a percentage of screen height
const ContainerHeight = Hp(20); // was Height / 6.5

const CustomTabBar = (props: BottomTabBarProps) => {
  
  const routes = props.state.routes;
  const tabCount = routes.length;

  const Radius = ModerateS(105); // main circle radius
  const IconWidth = Wp(13);
  const IconHeight = Hp(3);

  const centerX = Width / 2;
  const centerY = ContainerHeight;

  const [currentIndex, setCurrentIndex] = useState(0);

  const offset = 90 + (currentIndex * (360 / (tabCount * 2))); // offset to start from the top

  // Full circle divided into 2 * tabCount (to give spacing between tabs)
  const Angle = 360 / (tabCount * 2);

  const tabs = new Array(tabCount * 2).fill(null).map((_, index) => {
    const angle = (index * Angle - offset) * (Math.PI / 180); // top = 0 degrees
    const x = centerX + Radius * Math.cos(angle) - IconWidth / 2;
    const y = centerY + Radius * Math.sin(angle) - IconHeight / 2;
    const route = routes[index % tabCount]; // support dynamic tab count

    return { route, x, y };
  });


  const slideTimeout = useRef<NodeJS.Timeout | null>(null);
  
  const slideOpacity = useSharedValue(0);
  const yTranslate = useSharedValue(0);

  useEffect(() => {
    if (slideTimeout.current) {
      clearTimeout(slideTimeout.current);
    }

    slideTimeout.current = setTimeout(() => {
      yTranslate.value = withTiming(ContainerHeight/3, { duration: 350 });
      slideOpacity.value = withTiming(0.3, { duration: 350 });
    }, 1000 * 5); // delay to allow initial render

    yTranslate.value = withTiming(ContainerHeight * 0.01, { duration: 350 });
    slideOpacity.value = withTiming(1, { duration: 350 });
  }, [currentIndex]);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: yTranslate.value }],
    opacity: slideOpacity.value
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circleTab, animatedStyle]}>
        {/* Circular stroke */}
        <Svg width={Width} height={ContainerHeight}>
          <Circle
            cx={centerX}
            cy={centerY}
            r={Radius}
            fill="#e100ff9a"
            stroke="black"
            strokeWidth={Wp(11)}
          />
        </Svg>

        {/* Tab buttons positioned around the circle */}
        {tabs.map((tab, index) => {
          const isFocused = props.state.index === (index % tabCount);
          const { tabBarIcon } = props.descriptors[tab.route.key].options;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                props.navigation.navigate(tab.route.name);
                setCurrentIndex(index);
              }}
              style={{
                position: "absolute",
                left: tab.x,
                top: tab.y,
                width: IconWidth,
                height: IconHeight,
                justifyContent: "center",
                alignItems: "center",

                overflow: 'hidden'
              }}
            >
              {tabBarIcon && tabBarIcon({ focused: isFocused, color: "white", size: ModerateS(20) })}
            </TouchableOpacity>
          );
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    height: ContainerHeight,
    width: Width,
    backgroundColor: "transparent",
  },
  circleTab: {
    width: "100%",
    height: ContainerHeight,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomTabBar;
