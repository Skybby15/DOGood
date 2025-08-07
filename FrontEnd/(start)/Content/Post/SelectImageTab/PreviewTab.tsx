import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { PostNavList } from '../PostTypes';

type PreviewTabRouteProp = RouteProp<PostNavList, 'Preview'>;


export default function PreviewTab({ route }: { route: PreviewTabRouteProp })
{
    const imageUri = route.params.imageUri;




    return (
        <>
            <View style={styles.container}>
                <Image style={styles.selectedImage} src={imageUri}/>
                <TouchableOpacity>
                    <Text>
                        Finish
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'blue'
    },

    selectedImage:{
        width:100,
        height:100,
    },

    finishButton:{

    },
})