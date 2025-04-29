import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { NavigationContext } from "./GlobalVars"
import FeedTab from "../(start)/FeedTab";
import SettingsTab from "./SettingsTab";
import { NavList } from "./GlobalVars";

const Tab = createBottomTabNavigator();

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
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName;

                                if (route.name === 'Feed') {
                                    iconName = focused ? 'home' : 'home-outline';
                                } else if (route.name === 'Search'){
                                    iconName = focused ? 'search' : 'search-outline'
                                } else if (route.name === 'Post'){
                                    iconName = focused ? 'add-circle' : 'add-circle-outline'
                                }else if (route.name === 'Settings') {
                                    iconName = focused ? 'settings' : 'settings-outline';
                                } else if (route.name === 'Profile') {
                                    iconName = focused ? 'person' : 'person-outline';
                                }

                                // Return the icon component
                                return <Ionicons name={iconName} size={size} color={color} />;
                            },
                            tabBarActiveTintColor: 'black',
                            tabBarInactiveTintColor: 'gray',
                        })}>
                        <Tab.Screen name="Feed" component={FeedTab} options={{headerShown: false}} />
                        <Tab.Screen name="Search" component={FeedTab} options={{headerShown: false}}/>
                        <Tab.Screen name="Post" component={FeedTab} options={{headerShown: false}}/>
                        <Tab.Screen name="Profile" component={FeedTab} options={{headerShown: false}}/>
                        <Tab.Screen name="Settings" component={SettingsTab} options={{headerShown: false}}/>
                    </Tab.Navigator>
                </NavigationContainer>
            </NavigationIndependentTree>
        </NavigationContext.Provider>
    )
}