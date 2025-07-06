import Login from './(start)/Login/Login';
import SignUp from './(start)/SignUp/SignUp';
import Main from './(start)/Content/Main';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthUserStore } from './store/authStore';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();
import Toast from 'react-native-toast-message';

export default function App() {
  const { authCheck } = useAuthUserStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      console.log("Trying to restore session...");
      
      await authCheck()
      .then(() => {
        setIsAuthenticated(true);
        console.log("User profile entered successfully");
      })
      .catch((error) => {
        console.error("Error entering user profile:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    };

  restoreSession();
  }, []);

  console.log("isAuthenticated: ", isAuthenticated);

  if(isLoading) {
    return null; // or a loading spinner
  }

  return (  
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isAuthenticated ? "Main" : "Login"}>
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
          <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
          <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
      <Toast position="top" topOffset={60} />
    </>
  );
}
