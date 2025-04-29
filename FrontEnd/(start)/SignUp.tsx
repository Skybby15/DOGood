import { View, Text, Pressable, ImageBackground, Image, TextInput } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useAuthUserStore } from '../store/authUser';
import Toast from 'react-native-toast-message';
import Checkbox from 'expo-checkbox';

import { NavList } from "./GlobalVars";

export default function SignUp() 
{
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [isChecked, setChecked] = useState(false);

    const navigator = useNavigation<NavigationProp<NavList>>();

    const [loginPressed, setLoginPressed] = useState(false);
    const [adopterSelected, setAdopterSelected] = useState(false);
    const [shelterSelected, setShelterSelected] = useState(false);

    const [signUpActive, setSignUpActive] = useState(false);

    const {signup} = useAuthUserStore()

    useEffect(() => {
        checkForSignUp();
      }, [email, username, password, confirmPassword, isChecked, adopterSelected, shelterSelected]);

    const handleSignUp = async() =>{
        if(password != confirmPassword)
        {
            Toast.show({
                type: 'error',
                text1: 'Password does not corespond to confirm password!'
            })
            return;
        }
        signup({email,username,password,isAdoptionCentre:shelterSelected})
        .then((res)=>{
            Toast.show({
                type: 'success',
                text1: 'Login successful!',
            });
            console.log("Success");

            navigator.navigate("Login");
        }).catch((err) => {
            Toast.show({
                type: 'error',
                text1: err,
              });
            console.log("Fail");
        })
        
    }

    function checkForSignUp()
    {
        if(email.length == 0 || 
            username.length == 0 || 
            password.length == 0 || 
            confirmPassword.length == 0 ||
            (!adopterSelected && !shelterSelected) ||
            !isChecked)
            {
                setSignUpActive(false)
            }else
            {
                setSignUpActive(true)
            }
    }

    return(
        <View style={{flex: 1}}>
            <ImageBackground source = {require('../assets/pets/cat&dog1.jpeg')} blurRadius={0.9} style={{flex: 1}}>
                <View style={styles.headerContainer}>
                    <Image source={require('../assets/logo/Black-Logo-DG-Transparent.png')}
                            style={styles.logo}
                            />
                    <Text style={styles.headerText}>Create an account</Text>
                </View>
                <View style={styles.formContainer}>

                    <Text style={styles.detailsText}>Email</Text>
                    <TextInput id='email' 
                        style={styles.detailsInput} 
                        onChangeText={(text) =>
                            {
                                setEmail(text); 
                            }} 
                        value={email}
                    />

                    <Text style={styles.detailsText}>Username</Text>
                    <TextInput id='username'
                        style={styles.detailsInput} 
                        onChangeText={(text) =>
                            {
                                setUsername(text);
                            }} 
                        value={username}
                    />

                    <Text style={styles.detailsText}>Password</Text>
                    <TextInput id='password' 
                        style={styles.detailsInput} 
                        secureTextEntry={true}
                        onChangeText={(text) =>
                            {
                                setPassword(text);
                            }} 
                        value={password}
                    />
                    
                    <Text style={styles.detailsText}>Confirm Password</Text>
                    <TextInput id='confirmPassword' 
                        style={styles.detailsInput} 
                        secureTextEntry={true}
                        onChangeText={(text) =>
                            {
                                setConfirmPassword(text);
                            }}  
                        value={confirmPassword}
                    />

                    <View style={styles.adopterShelterContainer}>
                        <Pressable id="isAdopterButton" style={styles.adopterButton} onPress={()=>{setAdopterSelected(true),setShelterSelected(false)}}>
                            <Image source={require("../assets/caregivers.png")} style={adopterSelected ? styles.adopterImageSelected : styles.adopterImage}/>
                            <Text style={adopterSelected ? styles.adopterTextSelected : styles.adopterText}> Adopter </Text>
                        </Pressable>
                        <View style={styles.adopterShelterBorder}/>
                        <Pressable id="isShelterButton" style={styles.shelterButton} onPress={()=>{setAdopterSelected(false),setShelterSelected(true)}}>
                            <Text style={shelterSelected ? styles.shelterTextSelected : styles.shelterText}> Shelter </Text>
                            <Image source={require("../assets/shelter.png")} style={shelterSelected ? styles.shelterImageSelected : styles.shelterImage}/>
                        </Pressable>
                    </View>
                    
                    <View style={styles.termsAndPrivacyContainer}>
                        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} color={isChecked ? '#4630EB' : undefined} />
                        <Pressable onPress={() => setChecked(!isChecked)}>
                            <Text style={styles.termsAndPrivacyText}>I agree to the Terms of Service and Privacy Policy.</Text>
                        </Pressable>
                    </View>

                    <Pressable id = 'signUpButton' style={({pressed}) => [signUpActive ? styles.signUpButtonEnabled : styles.signUpButtonDisabled,signUpActive&&pressed&&styles.signUpButtonPressed]}
                        onPress={handleSignUp}>
                        <Text style={{color: "white"}}>Sign Up</Text>
                    </Pressable>

                    <View style={styles.lineWithText}>
                        <View style={styles.line} />
                        <Text style={styles.lineText}>OR</Text>
                        <View style={styles.line} />
                    </View>

                    <Pressable id = 'googleButton' style={({pressed}) => [styles.googleButton,pressed&&styles.googleButtonPressed]}>
                        <Text style={{color: "white"}}>Continue with Google ➔</Text>
                    </Pressable>

                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.loginText}>Already have an Account? </Text>
                        <Pressable id = 'loginButton' style={styles.loginButton} 
                            onPress={() => navigator.navigate('Login')}
                            onTouchStart={() => setLoginPressed(true)}
                            onTouchCancel={() => setLoginPressed(false)}
                            onTouchEnd={() => setLoginPressed(false)}>
                            <Text style={[{ color: loginPressed? 'lightblue':'skyblue' , textDecorationLine:'underline'},styles.loginText]}>Log in </Text>
                            <Text style={[{ color: loginPressed? 'lightblue':'skyblue'},styles.loginText]}>➔</Text>
                        </Pressable>
                    </View>

                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection: 'row'
    },
    logo: {
        width: 120,
        height: 120,
        alignSelf: 'flex-start',
        marginTop: 20,
    },
    headerText: {
        alignSelf: 'center',
        paddingTop: 20,
        fontSize: 30,
        fontWeight: 'bold',
    },

    formContainer: {
        paddingTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },

    detailsText:{
        fontSize: 17,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        marginLeft: 63,
        color: '#FFF',
        marginBottom: 3,
    },
    detailsInput:{
        width: '70%',
        borderWidth: 1,
        borderColor: '#FFF',
        backgroundColor: '#000',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: '#FFF',
    },

    adopterShelterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    adopterImage:{
        width: 20,
        height: 20,
    },
    adopterText:{
    },
    adopterImageSelected:{
        width:30,
        height:30,
    },
    adopterTextSelected: {
        fontSize: 20,
        textDecorationLine: 'underline',
        paddingRight:10,
        paddingLeft:5
    },
    adopterButton: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingRight: 10,
    },
    adopterShelterBorder:{
        borderWidth: 1,
        height: 50,
        transform: [{ rotate: '45deg' }],
    },
    shelterImage:{
        width: 23,
        height: 23,
    },
    shelterText:{

    },
    shelterImageSelected:{
        width:30,
        height:30
    },
    shelterTextSelected:{
        fontSize: 20,
        textDecorationLine: 'underline'
    },
    shelterButton: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingLeft: 10,
    },


    termsAndPrivacyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    termsAndPrivacyText: {
        paddingBottom: 2,
        fontWeight: '500',
    },
    checkbox: {
        marginRight: 10,
    },

    signUpButtonEnabled: {
        marginTop: 10,
        width: '70%',
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        opacity: 1,
    },
    signUpButtonDisabled: {
        marginTop: 10,
        width: '70%',
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        opacity: 0.3,
    },
    signUpButtonPressed:{
        opacity: 0.3,
    },

    googleButton: {
        marginTop: 10,
        width: '70%',
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    googleButtonPressed:{
        opacity: 0.3,
    },
    
    loginButton: {
        paddingRight:10,//ca sa nu fie nevoie sa fie prea precis apasatul de log in
        paddingBottom:10,
        flexDirection: 'row',
    },
    loginText:{
        fontSize: 14,
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
})