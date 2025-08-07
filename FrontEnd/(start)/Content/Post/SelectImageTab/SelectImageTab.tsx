import { View,Text,StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { Wp,Hp,ModerateS, colorSet } from "../../../GlobalVars";
import { useState, useEffect } from "react";
import { requestCameraPermissionsAsync, launchCameraAsync} from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { PostNavList } from "../PostTypes";


export default function SelectImageTab()
{
    const [imageSelected, setImageSelected] = useState(null);
    const [media, setMedia] = useState([]);
    const [endCursor, setEndCursor] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [loading, setLoading] = useState(false);

    const navigator = useNavigation<NavigationProp<PostNavList>>();

    useEffect(() => {
        loadMore();
    }, []);

    const loadMore = async () => {
        if (loading || !hasNextPage) return;

        setLoading(true);

        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') return;

        const result = await MediaLibrary.getAssetsAsync({
        mediaType: ['photo'],
        first: 30,
        after: endCursor,
        sortBy: MediaLibrary.SortBy.creationTime,
        });

        setMedia((prev) => [...prev, ...result.assets]);
        setEndCursor(result.endCursor);
        setHasNextPage(result.hasNextPage);
        setLoading(false);
    };

    const openCamera = async () => {
        console.log("Opening camera");
        const camPerm = await requestCameraPermissionsAsync();
        if(!camPerm.granted) return;

        const result = await launchCameraAsync();
        console.log("RESULT: ",result.assets[0].uri);

        if(result.assets.length > 1)
            console.log("Somehow more than 1 photo was taken , grabbing the first one.");

        if (result.assets != null)        
            setImageSelected(result.assets[0].uri);
    }

    return(

        <View style={styles.container}>
            <Text>
                Select an image:
            </Text>
            {imageSelected == null &&
                <View style={styles.previewCard}>
                    <Ionicons name='help' size={ModerateS(80)} />                
                </View>
            }
            {imageSelected != null &&
                <Image src={imageSelected} style={styles.previewCard}></Image>
            }
            <TouchableOpacity style={styles.cameraButton} 
                onPress={openCamera}>
                <Ionicons name='camera' size={ModerateS(34)}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.nextButton,{opacity: imageSelected == null ? 0.4 : 1}]}
                onPress={() => {
                    navigator.navigate("Preview",{imageUri:imageSelected})}
                }
                disabled={imageSelected == null ? true : false}
                activeOpacity={0.4}
            >
                <Ionicons name='arrow-forward' size={ModerateS(34)}/>
            </TouchableOpacity>
            <View style={styles.galleryList}>
                <FlatList
                data={media}
                keyExtractor={(item) => item.id}
                numColumns={4}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setImageSelected(item.uri)}>
                            <Image
                            source={{ uri: item.uri }}
                            style={{ width: Wp(25), height: Wp(25) }}
                            />
                    </TouchableOpacity>
                )}
                ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
                />
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
    },
})