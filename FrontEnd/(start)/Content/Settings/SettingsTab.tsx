import React, { useContext, useEffect } from 'react';
import { View, Text, Pressable, TouchableOpacity } from "react-native"
import { StyleSheet } from 'react-native';
import MainContext from '../MainContext';
import { useIsFocused } from '@react-navigation/native';

import { Width, Height, Wp, Hp, UnsafeAreasRef } from '../../GlobalVars';

export default function SettingsTab()
{
    const isFocused = useIsFocused();

    const { navigateToLogin , store } = useContext(MainContext);
    const { logout } = store;

    async function handleLogout() {
        await logout()
        .then(() => {
            console.log("Logout successful");
            navigateToLogin();
        })
        .catch((err) => {
            console.error("Logout failed:", err);
        });
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={handleLogout} style={styles.button}>
                <Text> Logout </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#b4a8e6ff',
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