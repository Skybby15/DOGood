import { useState,useEffect } from "react";
import { View,Text,StyleSheet, ImageBackground, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import FamilyScreen from "./ProfileScreens/FamilyScreen";
import PostsScreen from "./ProfileScreens/PostsScreen";
import MentionsScreen from "./ProfileScreens/MentionsScreen";

import { NavigationContainer, createNavigationContainerRef, NavigationIndependentTree, NavigationProp } from '@react-navigation/native';

import { NavList } from '../GlobalVars';


const navigationRef = createNavigationContainerRef<NavList>();
const Stack = createStackNavigator();

export default function ProfileTab()
{
    //trebuie sa iau tipul de user (shelter/caregiver)
    const path = '../../assets/caregivers.png' // aici trebuie setat in functie de tip
    const [tabSelected,setTabSelected] = useState('Family');

    return(
        <View style={styles.container}>
            <View style={styles.topContent}>
                <ImageBackground style={styles.profilePic}
                    source={require('../../assets/logo/ColorLogo.png')}/>
                <View style={styles.statusPic}>
                    <ImageBackground source={require(path)} style={{width:30,height:30,top:4,left:5}}/>
                </View>
            </View>
            <View style={styles.bottomContent}>
                <View style={styles.topMenu}>
                    <View id='topMenuBackground'
                        style={[styles.menuBackground,{left: tabSelected === 'Family' ? 42 : tabSelected === 'Posts' ? 185 : 328}]}/> 
                    <TouchableOpacity id='FamilyTab' 
                        onPress={()=>{setTabSelected('Family'),navigationRef.navigate('Family')}}
                        style={styles.menuButton}>
                        <MaterialCommunityIcons name="home-heart" size={33} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity id='PostsTab' 
                        onPress={()=>{setTabSelected('Posts'),navigationRef.navigate('Posts')}}
                        style={styles.menuButton} >
                        <Ionicons name="images" size={28} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity id='MentionsTab' 
                        onPress={()=>{setTabSelected('Mentions'),navigationRef.navigate('Mentions')}}
                        style={styles.menuButton}>
                        <MaterialCommunityIcons name="tag-heart" size={31} color="black" />
                    </TouchableOpacity>
                    <View style={{position:'absolute', flex: 1, width:"100%", height:400,top:40 }}>
                        <NavigationIndependentTree>
                        <NavigationContainer ref={navigationRef}>
                            <Stack.Navigator id={undefined}
                                screenOptions={{
                                    headerShown: false,
                                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOSInverted,
                                }}
                                initialRouteName="Family"
                            >
                                <Stack.Screen name="Family" component={FamilyScreen} />
                                <Stack.Screen name="Posts" component={PostsScreen} />
                                <Stack.Screen name="Mentions" component={MentionsScreen} />
                            </Stack.Navigator>
                        </NavigationContainer>
                        </NavigationIndependentTree>
                    </View>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#A8B5DB',
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topBackground:{
        position:'absolute',
        width:"100%",
        height:236,
    },
    profilePic:{
        top: 100,
        position:'absolute',
        width:70,
        height:70,
        borderRadius:'100%',
        overflow:'hidden',
        borderColor:'black',
        borderWidth:1,
    },
    statusPic:{
        backgroundColor:'white',
        borderRadius:'100%',
        position:'absolute',
        width: 40,
        height: 40,
        top:150,
        right:170,
    },
    topMenu:{
        position:'absolute',
        top: 200,
        height:"100%",
        width:"100%",

        flexDirection:'row',
        justifyContent:'space-between',
    },
    menuButton:{
        borderRadius:20,
        height:30,
        width: '33.3333333333333333333333%',
        
        alignItems: 'center',
        justifyContent:'center',

    },
    menuBackground:{
        position:'absolute',
        width:60,
        height:40,
        backgroundColor:'purple',
        borderRadius:20,
        top:-4,
    },
    topContent:{
        position:'absolute',
        alignItems:'center',
        width:'100%',
        top:0,
    },
    bottomContent:{
        position:'absolute',
        alignItems:'center',
        width:'100%',
        top:0,
    },

})