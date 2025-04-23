import { Header } from 'react-native/Libraries/NewAppScreen';
import Login from './(start)/Login';
import SignUp from './(start)/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {

  return (  
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
          <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}
