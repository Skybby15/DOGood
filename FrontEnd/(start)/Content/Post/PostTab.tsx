import { View,Text,StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { SetUnsafeAreaBackgroundColor } from "../../GlobalVars";
import { Ionicons } from '@expo/vector-icons'
import { Wp,Hp, Height, Width, ModerateS, VerticalS, colorSet } from "../../GlobalVars";
import { useState } from "react";


export default function PostTab()
{
    const [imageSelected, setImageSelected] = useState(null);

    return(

        <View style={styles.container}>
            <View style={styles.previewCard}>
                {imageSelected == null &&
                    <Ionicons name='help' size={ModerateS(80)} />
                }
            </View>
            <TouchableOpacity style={styles.cameraButton}>
                <Ionicons name='camera' size={ModerateS(34)}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.nextButton,{opacity:0.4}]}
                disabled={true}
                activeOpacity={0.4}
            >
                <Ionicons name='arrow-forward' size={ModerateS(34)}/>
            </TouchableOpacity>
            <View style={styles.galleryList}>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        backgroundColor: '#b4a8e6ff',

    },

    previewCard: {
        justifyContent: 'center',
        alignItems: 'center',

        position: 'absolute',
        top:Hp(4),
        left:Wp(50) - ModerateS(90),

        width: ModerateS(180),
        height: ModerateS(180),

        borderWidth: 1,
        borderRadius: 20,

        backgroundColor: colorSet[1],
    },

    cameraButton: {
        width: Wp(15),
        height: Hp(5),
        
        justifyContent: 'center',
        alignItems: 'center',
        position:'absolute',
        bottom:Hp(66),
        left: Wp(1),

        
        backgroundColor: colorSet[1],
        
        borderRadius: ModerateS(10),
        borderColor: '#2600ffff',
        borderWidth: 1
    },

    nextButton: {
        width: Wp(15),
        height: Hp(5),
        
        justifyContent: 'center',
        alignItems: 'center',
        position:'absolute',
        bottom:Hp(66),
        right: Wp(1),
        
        backgroundColor: colorSet[1],
        
        borderRadius: ModerateS(10),
        borderColor: '#2600ffff',
        borderWidth: 1,
    },

    galleryList: {
        width: Wp(100),
        height: Hp(65),
        position: 'absolute',
        bottom: 0,

        borderWidth: 2,
        borderColor: 'red',
    },
})