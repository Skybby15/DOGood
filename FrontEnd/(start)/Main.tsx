import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { createBottomTabNavigator, SceneStyleInterpolators } from "@react-navigation/bottom-tabs"
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { NavigationContext } from "./GlobalVars"
import FeedTab from "./MainWindowTabs/FeedTab";
import PostTab from "./MainWindowTabs/PostTab";
import ProfileTab from "./MainWindowTabs/ProfileTab";
import SearchTab from "./MainWindowTabs/SearchTab";
import SettingsTab from "./MainWindowTabs/SettingsTab";
import { NavList } from "./GlobalVars";
import { ImageBackground, StyleSheet, View } from "react-native";
import { useState,useEffect } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useNavigationState } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function TabIcon({focused,iconFocused,iconDeFocused,route} : any){
    const bgOpacity = useSharedValue(0);

    const currentRouteName = useNavigationState(state => state.routes[state.index].name);
    useEffect(() => {
        bgOpacity.value = withTiming(currentRouteName == route ? 1 : 0 , {duration:100});
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

    function navigateToLogin()
    {
        navigator.navigate('Login')
    }

    return (
        <NavigationContext.Provider value={{navigateToLogin}} >
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
                                backgroundColor: '#0f0D23',
                                borderRadius: 50,
                                marginHorizontal: 10,
                                marginBottom: 20,
                                paddingTop: 3,
                                position: 'absolute',
                                overflow: 'hidden',
                                borderWidth: 0.2,
                                borderColor: '#0f0D23',
                                height: 45,
                                
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
        </NavigationContext.Provider>
    )
}

const styles = StyleSheet.create({
    tab:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'purple',
        borderRadius: 30,
        overflow: 'hidden',
        
        width: 90,
        height: 60,
    }
})