import {View, Text, SafeAreaView, Image, ImageBackground} from 'react-native';
import { StyleSheet } from 'react-native';
import Login from './Login';

export default function Welcome() {
  return (
    <View style={{flex: 1}}>
      <ImageBackground source={require('../assets/pets/dog1.jpeg')} blurRadius={2} style={{flex: 1}}>
        <Image source={require('../assets/logo/White-Logo-DG-Transparent.png')}
          style={styles.logo}
        ></Image>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'flex-start',
    marginTop: 20,
  }
});
