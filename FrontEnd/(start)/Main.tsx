import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { NavigationContext } from "./GlobalVars"
import FeedTab from "../(start)/FeedTab";
import SettingsTab from "./SettingsTab";
import { NavList } from "./GlobalVars";
import { ImageBackground, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

function TabIcon({focused,iconFocused,iconDeFocused,title} : any){

    if(focused)
    {
        return (
            <ImageBackground style={styles.tab}>
                <Ionicons name={iconFocused} color={'white'} size={25}/>
            </ImageBackground>
        );
    }else 
        return (
            <ImageBackground>
                <Ionicons name={iconDeFocused} color={'white'} size={25}/>
            </ImageBackground>
        );
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
                                borderColor: '0f0D23',
                                //height: 70,
                            }
                        })}>
                        <Tab.Screen name="Feed" component={FeedTab} 
                        options={{
                            headerShown: false,
                            tabBarIcon: ({focused, color, size}) => {
                                return (
                                    <TabIcon focused={focused} 
                                            iconFocused={'home'} 
                                            iconDeFocused={'home-outline'}
                                    />
                                );
                            },
                            tabBarShowLabel: false
                            }} />
                        <Tab.Screen name="Search" component={FeedTab} 
                        options={{
                            headerShown: false,
                            tabBarIcon: ({focused, color, size}) => {
                                return (
                                    <TabIcon focused={focused} 
                                            iconFocused={'search'} 
                                            iconDeFocused={'search-outline'}
                                    />
                                );
                            },
                            tabBarShowLabel: false
                            }}/>
                        <Tab.Screen name="Post" component={FeedTab} options={{
                            headerShown: false,
                            tabBarIcon: ({focused, color, size}) => {
                                return (
                                    <TabIcon focused={focused} 
                                            iconFocused={'add-circle'} 
                                            iconDeFocused={'add-circle-outline'}
                                    />
                                );
                            },
                            tabBarShowLabel: false
                            }}/>
                        <Tab.Screen name="Profile" component={FeedTab} options={{
                            headerShown: false,
                            tabBarIcon: ({focused, color, size}) => {
                                return (
                                    <TabIcon focused={focused} 
                                            iconFocused={'person'} 
                                            iconDeFocused={'person-outline'}
                                    />
                                );
                            },
                            tabBarShowLabel: false
                            }}/>
                        <Tab.Screen name="Settings" component={SettingsTab} options={{
                            headerShown: false,
                            tabBarIcon: ({focused, color, size}) => {
                                return (
                                    <TabIcon focused={focused} 
                                            iconFocused={'settings'} 
                                            iconDeFocused={'settings-outline'}
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
        width: '100%',
        flex: 1,
        minWidth: 90,
        minHeight: 60,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'purple',
        borderRadius: 30,
        overflow: 'hidden',

    }
})