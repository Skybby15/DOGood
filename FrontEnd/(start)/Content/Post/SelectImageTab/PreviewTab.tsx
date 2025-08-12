import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { PostNavList } from '../PostTypes';
import { colorSet, Hp, ModerateS, Wp } from "../../../GlobalVars";
import { useUserProfileStore } from "../../../../store/profileStore";

type PreviewTabRouteProp = RouteProp<PostNavList, 'Preview'>;


export default function PreviewTab({ route }: { route: PreviewTabRouteProp })
{
    const imageUri = route.params.imageUri;
    const { postImage } = useUserProfileStore();

    const handlePostImage = async () => {
        if (imageUri) {
            await postImage(imageUri);
        }
    };

    return (
        <>
            <View style={styles.container}>
                <Image style={styles.selectedImage} src={imageUri}/>
                <TouchableOpacity style={styles.postButton} onPress={handlePostImage}>
                    <Text style={{fontSize: ModerateS(15)}}>
                        Post
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colorSet[0],
    },

    selectedImage:{
        position: 'absolute',
        top: Hp(20),
        left: Wp(30),

        width: Wp(40),
        height: Hp(20),

        borderRadius: ModerateS(10),
        borderWidth:2,
    },

    postButton:{
        position: 'absolute',
        bottom: Hp(30),
        left: Wp(40),
        
        width: Wp(20),
        height: Hp(3),

        alignItems:'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,

        backgroundColor: colorSet[1],
    },
})