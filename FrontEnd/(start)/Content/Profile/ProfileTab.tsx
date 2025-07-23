import { useState, useEffect} from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FamilyScreen from "../Profile/ProfileScreens/FamilyScreen";
import PostsScreen from "../Profile/ProfileScreens/PostsScreen";
import MentionsScreen from "../Profile/ProfileScreens/MentionsScreen";
import Animated from "react-native-reanimated";
import ProfileContext from "./ProfileContext";

import { NavigationContainer, createNavigationContainerRef, NavigationIndependentTree } from '@react-navigation/native';
import { NavList } from '../../GlobalVars';
import { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useUserProfileStore } from "../../../store/profileStore";
import { profile } from "console";

const navigationRef = createNavigationContainerRef<NavList>();
const Stack = createBottomTabNavigator();

const { width,height } = Dimensions.get("window");

export default function ProfileTab() {
  const path = '../../../assets/caregivers.png'; // Adjust this dynamically as needed
  const [tabSelected, setTabSelected] = useState('Family');

  const bgPosX = useSharedValue(42);

  useEffect(() => {
    if (tabSelected === 'Family') {
      bgPosX.value = withSpring(width / 4 - 60, {duration:900}); // Center of 60px wide menu background
    } else if (tabSelected === 'Posts') {
      bgPosX.value = withSpring(width / 2 - 30, {duration:900});
    } else if (tabSelected === 'Mentions') {
      bgPosX.value = withSpring(width * 3 / 4, {duration:900});
    }
  }, [tabSelected]);

  const bounceEffect = useAnimatedStyle(() => ({
    transform: [{ translateX: bgPosX.value }],
  }));

  function ChangeTab(destination: string) {

    if (navigationRef.canGoBack()) {
      navigationRef.goBack();
    }

    setTabSelected(destination);
    setTimeout(() => {
      navigationRef.navigate(destination as undefined);
    }, 100);
  }

  const profileStore = useUserProfileStore();
  const { getProfilePic } = profileStore;

  const res = getProfilePic();

  const [profileURL, setProfileURL] = useState("")

  res.then((string) => {setProfileURL(string)});

  console.log("TEST");

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Pressable>
          <ImageBackground
            style={styles.profilePic}
            source={profileURL === "" ? null : { uri: profileURL }}
          />
        </Pressable>
        <View id='info' style={styles.infoText}>
          <Text id='name' style={{fontWeight:'500',marginBottom:height/110,width:500}}>
              DOGood Official
          </Text>
          <Text id='bio' style={{width:width/1.6,height:height/11}} >
              Makes the world a better place {'\n'}
              Better than ever
          </Text>
        </View>
        <View style={styles.statusPic}>
          <ImageBackground source={require(path)} style={{ width: 23, height: 23 }} />
        </View>
      </View>

      <View style={styles.tabSection}>
        <View style={styles.tabMenu}>
          <Animated.View style={[styles.menuBackground, bounceEffect]} />
          <TouchableOpacity style={[styles.menuButton, { left: width / 4 - 60 }]} onPress={() => ChangeTab('Family')}>
            <MaterialCommunityIcons name="home-heart" size={28} color={tabSelected === "Family" ? "white" : "black"} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuButton, { left: width / 2 - 30 }]} onPress={() => ChangeTab('Posts')}>
            <Ionicons name="images" size={24} color={tabSelected === "Posts" ? "white" : "black"} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuButton, { left: width * 3 / 4 }]} onPress={() => ChangeTab('Mentions')}>
            <MaterialCommunityIcons name="tag-heart" size={26} color={tabSelected === "Mentions" ? "white" : "black"} />
          </TouchableOpacity>
        </View>

        <View style={styles.contentSection}>
          <ProfileContext.Provider value={{ tabSelected }}>
            <NavigationIndependentTree>
              <NavigationContainer ref={navigationRef}>
                <Stack.Navigator id={undefined}
                  screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                      width: 0,
                      height: 0,
                    },
                  }}
                  initialRouteName="Family"
                >
                  <Stack.Screen name="Family" component={FamilyScreen} />
                  <Stack.Screen name="Posts" component={PostsScreen} />
                  <Stack.Screen name="Mentions" component={MentionsScreen} />
                </Stack.Navigator>
              </NavigationContainer>
            </NavigationIndependentTree>
          </ProfileContext.Provider>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b4a8e6ff',
  },
  topSection: {
    flex: 1,
    left: width/10,
    top: height/15,
    position: 'relative',
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    borderColor: 'black',
    borderWidth: 1,
  },
  statusPic: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: 34,
    height: 34,
    position: 'absolute',
    left: width/9,
    top: height/15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText:{
    position:'absolute',
    left: width/4.5,
    top: height/90,
  },
  tabSection: {
    flex: 4.5,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tabMenu: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 8,
  },
  menuBackground: {
    position: 'absolute',
    width: 60,
    height: 40,
    backgroundColor: 'purple',
    borderRadius: 20,
    top: 5,
  },
  menuButton: {
    position: 'absolute',
    height: 40,
    width: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentSection: {
    flex: 1,
    width: '100%',
  },
});
