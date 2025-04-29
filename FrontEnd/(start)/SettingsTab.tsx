import React, { useContext } from 'react';
import { View, Text, Pressable } from "react-native"
import { StyleSheet } from 'react-native';
import { NavigationContext } from './GlobalVars'

export default function SettingsTab()
{
    const {navigateToLogin} = useContext(NavigationContext);

    return(
        <View style={styles.settingsContainer}>
            <Pressable onPress={navigateToLogin}>
                <Text> Logout </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    settingsContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})