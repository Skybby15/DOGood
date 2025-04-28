import Login from './(start)/Login';
import SignUp from './(start)/SignUp';
import Main from './(start)/Main';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import Toast from 'react-native-toast-message';

export default function App() {

  return (  
    <>
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
          <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
          <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
      <Toast position="top" topOffset={60} />
    </>
  );
}
