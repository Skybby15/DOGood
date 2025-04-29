import React from 'react';
import { View, Text, Pressable } from "react-native"



export default function SettingsTab({ route }: { route: any })
{
    const {navigateToLogin} = route.params;

    return(
        <View>
            <Text> Settings Tab</Text>
            <Pressable onPress={navigateToLogin}>
                <Text> Logout </Text>
            </Pressable>
        </View>
    );
}