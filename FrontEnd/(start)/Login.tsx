import {View, Text, TextInput, Pressable} from 'react-native';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-native-toast-message';
import { useAuthUserStore } from '../store/authUser';


export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuthUserStore();

    const handleLogin = async() =>{
        login({email, password});
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Log in to DOGood</Text>

            <Text style={styles.infoText}>
                Email or Username
            </Text>
            <TextInput id='email/username' 
                style={styles.input} 
                onChangeText={setEmail} 
                value={email}
            />

            <Text style={styles.infoText}>
                Password
            </Text>
            <TextInput id='Password' 
                style={styles.input}
                secureTextEntry={true}
                onChangeText={setPassword} 
                value={password}
            />

            <Pressable id = 'loginButton'
                style={({ pressed }) => [
                    styles.loginButton,
                    pressed && styles.ButtonPressed,
                ]}
                onPress={handleLogin}>
                <Text style={{color: '#FFF'}}>Log in</Text>
            </Pressable>

            <View style={styles.lineWithText}>
                <View style={styles.line} />
                <Text style={styles.lineText}>OR</Text>
                <View style={styles.line} />
            </View>

            <Pressable id='signUpButton'
                style={({ pressed }) => [
                    styles.signUpButton,
                    pressed && styles.ButtonPressed,
                ]}
                onPress={()=>{}}>
                    
                <Text>Sign up</Text>
            </Pressable>

            <Pressable id='googleButton'
                style={({ pressed }) => [
                    styles.googleButton,
                    pressed && styles.ButtonPressed,
                ]}
                onPress={() => {}}>
                    
                <Text>Continue with google</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        alignItems: 'center',
    },

    header:{
        fontSize: 25,
        fontWeight: '900',
        marginBottom: 20,
        marginLeft: 10,
        color: '#FFF',
        alignSelf: 'center',
    },

    input: {
        color: 'black',
        backgroundColor: '#FFF',
        borderRadius: 5,
        width: '90%',
        //am adaugat height ca se vedea ingust pe telefon
        height: '4%',
        marginBottom: 10,
    },
    infoText: {
        fontWeight: '500',
        fontSize: 16,
        alignSelf: 'flex-start',
        color: '#FFF',
        marginLeft: 22,
        marginBottom: 5,
    },
    loginButton: {
        marginTop: 10,
        width: '75%',
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    ButtonPressed: { // Change to a darker shade or any color you prefer
        opacity: 0.3,
    },

    signUpButton: {
        width: '75%',
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },

    googleButton: {
        marginTop: 20,
        width: '75%',
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
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
        color: '#FFF',
        marginHorizontal: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});