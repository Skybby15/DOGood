import Login from './(start)/Login/Login';
import SignUp from './(start)/SignUp/SignUp';
import Main from './(start)/Content/Main';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthUserStore } from './store/authStore';
import { useEffect, useRef, useState } from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { SafeAreaInsetsContext, SafeAreaProvider , SafeAreaView, SafeAreaProviderProps} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { UnsafeAreasRef, Width, Height, setSafeAreaSize } from './(start)/GlobalVars';

const Stack = createNativeStackNavigator();

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

  StatusBar.setBarStyle('light-content');

  console.log("FullView dimensions:", Width, Height);

  return (
    <>
      <SafeAreaProvider>
      
        <SafeAreaView 
        ref={UnsafeAreasRef}
        style={{ flex: 1,backgroundColor: '#7b668dff' }}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={isAuthenticated ? "Main" : "Login"}
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="Main" component={Main} />
            </Stack.Navigator>
          </NavigationContainer>
        <Toast position="top" topOffset={60}/>
        </SafeAreaView>
      
      </SafeAreaProvider>
    </>
  );
}
