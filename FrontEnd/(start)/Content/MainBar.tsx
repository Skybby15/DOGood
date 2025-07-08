import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Width, Height, ModerateS, Wp, Hp } from "../GlobalVars";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Svg, { Circle } from "react-native-svg";

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

  // Full circle divided into 2 * tabCount (to give spacing between tabs)
  const Angle = 360 / (tabCount * 2);

  const tabs = new Array(tabCount * 2).fill(null).map((_, index) => {
    const angle = (index * Angle - 90) * (Math.PI / 180); // top = 0 degrees
    const x = centerX + Radius * Math.cos(angle) - IconWidth / 2;
    const y = centerY + Radius * Math.sin(angle) - IconHeight / 2;
    const route = routes[index % tabCount]; // support dynamic tab count

    return { route, x, y };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={styles.circleTab}>
        {/* Circular stroke */}
        <Svg width={Width} height={ContainerHeight}>
          <Circle
            cx={centerX}
            cy={centerY}
            r={Radius}
            fill="transparent"
            stroke="black"
            strokeWidth={Wp(11)}
          />
        </Svg>

        {/* Tab buttons positioned around the circle */}
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => props.navigation.navigate(tab.route.name)}
            style={{
              position: "absolute",
              left: tab.x,
              top: tab.y,
              width: IconWidth,
              height: IconHeight,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                borderColor: "black",
                borderWidth: 1,
                width: "100%",
                height: "100%",
                textAlign: "center",
                textAlignVertical: "center",
                fontSize: ModerateS(12),
              }}
            >
              {tab.route.name}
            </Text>
          </TouchableOpacity>
        ))}
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
