import { createNativeStackNavigator, } from "@react-navigation/native-stack"
import { NavigationContainer, NavigationIndependentTree, useNavigation} from '@react-navigation/native';


import SelectImageTab from "./SelectImageTab/SelectImageTab";
import PreviewTab from "./SelectImageTab/PreviewTab";
const PostStack = createNativeStackNavigator();



export default function PostTab()
{

    const navigator = useNavigation();

    return (
        <NavigationIndependentTree>
            <NavigationContainer>
                        <PostStack.Navigator
                        id={undefined}
                        initialRouteName="SelectImage"
                        screenOptions={{
                            headerShown: false,
                        }}
                        >
                        <PostStack.Screen name="SelectImage" component={SelectImageTab} initialParams={{navigator}} />
                        <PostStack.Screen name="Preview" component={PreviewTab} initialParams={{navigator}}/>
                        </PostStack.Navigator>
            </NavigationContainer>
        </NavigationIndependentTree>
    )
}