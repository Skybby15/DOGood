import {View, Text, SafeAreaView} from 'react-native';
import { StyleSheet } from 'react-native';
import Login from './Login';

export default function Welcome() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>DOGood</Text>
      </View>
      <Login/>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: '#FF1',
    flex: 0.10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
  },
});
