import {View, Text, TextInput, Button, Pressable} from 'react-native';
import { StyleSheet } from 'react-native';

function onPressLogin() {
    console.log('Log in button pressed');
}

export default function Login(){
    return (
        <View style={{borderColor: '#000', borderWidth: 3, flex: 0.5}}>
            <Text style={{fontWeight: 'bold', fontSize: 20, height: 35, marginBottom: 20, marginLeft: 10}}>Log in to DOGood</Text>
            <Text>Email or username</Text>
            <TextInput style={styles.input}></TextInput>
            <Text>Password</Text>
            <TextInput style={styles.input}></TextInput>
            <Pressable 
                style={({ pressed }) => [
                    styles.loginButton,
                    pressed && styles.loginButtonPressed,
                ]}
                onPress={onPressLogin}>
                <Text>Log in</Text>
            </Pressable>
            <View style={styles.lineWithText}>
                <View style={styles.line} />
                <Text style={styles.lineText}>OR</Text>
                <View style={styles.line} />
            </View>
            <Pressable 
                style={({ pressed }) => [
                    styles.loginButton,
                    pressed && styles.loginButtonPressed,
                ]}
                onPress={onPressLogin}>
                    
                <Text>Sign up</Text>
            </Pressable>
            <Pressable 
                style={({ pressed }) => [
                    styles.loginButton,
                    pressed && styles.loginButtonPressed,
                ]}
                onPress={onPressLogin}>
                    
                <Text>Continue with google</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 5,
    },
    loginButton: {
        marginLeft: '15%',
        width: '70%',
        backgroundColor: '#FF1',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonPressed: { // Change to a darker shade or any color you prefer
        opacity: 0.3,
    },
    lineWithText: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#000',
    },
    lineText: {
        marginHorizontal: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});