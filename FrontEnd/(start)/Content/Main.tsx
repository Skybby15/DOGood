import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { NavList, Height, Width } from "../GlobalVars";
import MainContext from "./MainContext";
import FeedTab from "./Feed/FeedTab";
import PostTab from "./Post/PostTab";
import ProfileTab from "./Profile/ProfileTab";
import SearchTab from "./Search/SearchTab";
import SettingsTab from "./Settings/SettingsTab";
import { StyleSheet, View } from "react-native";
import { useEffect } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useNavigationState } from '@react-navigation/native';

import { useUserProfileStore } from "../../store/profileStore";

const Tab = createBottomTabNavigator();

function TabIcon({focused,iconFocused,iconDeFocused,route} : any){
    const bgOpacity = useSharedValue(0);

    const currentRouteName = useNavigationState(state => state.routes[state.index].name);
    useEffect(() => {
        bgOpacity.value = withTiming(currentRouteName == route ? 1 : 0 , {duration:150});
    }, [currentRouteName]);

    const animatedStyle = useAnimatedStyle(() => ({
                opacity: bgOpacity.value,
                position: 'absolute',
            }));

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', width: 90, height: 60 }}>
            <Animated.View
                style={[
                    styles.tab,
                    animatedStyle,
                ]}
            />
            <Ionicons
                name={focused ? iconFocused : iconDeFocused}
                color={'white'}
                size={25}
                style={{ opacity: 1, zIndex: 1 }}
            />
        </View>
    )
}

export default function MainPage()
{
    const navigator = useNavigation<NavigationProp<NavList>>();
    const profileStore = useUserProfileStore();

    function navigateToLogin()
    {
        navigator.navigate('Login')
    }

    return (
        <MainContext.Provider value={{navigateToLogin, store: profileStore}} >
            <NavigationIndependentTree>
                <NavigationContainer>
                    <Tab.Navigator id={undefined}
                        screenOptions={() => ({
                            tabBarActiveTintColor: 'black',
                            tabBarInactiveTintColor: 'gray',
                            tabBarShowLabel: false,
                            tabBarItemStyle: {
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            },
                            tabBarStyle: {
                                opacity: 1,
                                backgroundColor: '#0f0D23',
                                borderRadius: 0,
                                paddingTop: 3,
                                position: 'absolute',
                                overflow: 'hidden',
                                borderWidth: 0.2,
                                borderColor: '#0f0D23',
                                height: Height/15,
                                width: Width ,
                                
                            }
                            
                        })}>
                        <Tab.Screen name="Feed" component={FeedTab} 
                        options={{
                            headerShown: false,
                            
                            
                            tabBarIcon: ({focused}) => {
                                return (
                                    <TabIcon focused={focused} 
                                            iconFocused={'home'} 
                                            iconDeFocused={'home-outline'}
                                            route={'Feed'}
                                    />
                                );
                            },
                            tabBarShowLabel: false
                            }} />
                        <Tab.Screen name="Search" component={SearchTab} 
                        options={{
                            headerShown: false,
                            tabBarIcon: ({focused}) => {
                                return (
                                    <TabIcon focused={focused} 
                                            iconFocused={'search'} 
                                            iconDeFocused={'search-outline'}
                                            route={'Search'}
                                    />
                                );
                            },
                            tabBarShowLabel: false
                            }}/>
                        <Tab.Screen name="Post" component={PostTab} options={{
                            headerShown: false,
                            tabBarIcon: ({focused}) => {
                                return (
                                    <TabIcon focused={focused} 
                                            iconFocused={'add-circle'} 
                                            iconDeFocused={'add-circle-outline'}
                                            route={'Post'}
                                    />
                                );
                            },
                            tabBarShowLabel: false
                            }}/>
                        <Tab.Screen name="Profile" component={ProfileTab} options={{
                            headerShown: false,
                            tabBarIcon: ({focused}) => {
                                return (
                                    <TabIcon focused={focused} 
                                            iconFocused={'person'} 
                                            iconDeFocused={'person-outline'}
                                            route={'Profile'}
                                    />
                                );
                            },
                            tabBarShowLabel: false
                            }}/>
                        <Tab.Screen name="Settings" component={SettingsTab} options={{
                            headerShown: false,
                            tabBarIcon: ({focused}) => {
                                return (
                                    <TabIcon focused={focused} 
                                            iconFocused={'settings'} 
                                            iconDeFocused={'settings-outline'}
                                            route={'Settings'}
                                    />
                                );
                            },
                            tabBarShowLabel: false
                            }}/>
                    </Tab.Navigator>
                </NavigationContainer>
            </NavigationIndependentTree>
        </MainContext.Provider>
    )
}

const styles = StyleSheet.create({
    tab:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'purple',
        borderRadius: 24,
        overflow: 'hidden',
        
        width: Width/7,
        height: Height/20,
    }
})