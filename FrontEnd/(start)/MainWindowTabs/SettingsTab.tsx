import React, { useContext } from 'react';
import { View, Text, Pressable, TouchableOpacity } from "react-native"
import { StyleSheet } from 'react-native';
import { NavigationContext } from '../GlobalVars'

export default function SettingsTab()
{
    const {navigateToLogin} = useContext(NavigationContext);

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={navigateToLogin} style={styles.button}>
                <Text> Logout </Text>
            </TouchableOpacity>
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

    button: {
        justifyContent: 'center',
        alignItems: 'center',

        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 40,
        width: 100,
        height: 40,
    }
})