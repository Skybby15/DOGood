import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './(start)/Welcome';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
      <Welcome />
      <Toast position="top" topOffset={60} />
    </>
  );
}
