import { View,Text, Dimensions, StyleSheet, ImageBackground, Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useContext, useEffect } from "react";
import { FlatList } from "react-native";
import { ProfileContext } from "../ProfileTab";

const { width } = Dimensions.get("window");

// test items
const familyMembers = [
        {id:1,image:require('../../../assets/pets/carnatOcta.jpg'),name:"undeWaterBoy"},
        {id:2,image:require('../../../assets/pets/carnatOcta.jpg'),name:"undeWaterBoy"},
        {id:3,image:require('../../../assets/pets/carnatOcta.jpg'),name:"undeWaterBoy"},
        {id:4,image:require('../../../assets/pets/carnatOcta.jpg'),name:"undeWaterBoy"},
        {id:5,image:require('../../../assets/pets/carnatOcta.jpg'),name:"undeWaterBoy"},
        {id:6,image:require('../../../assets/pets/carnatOcta.jpg'),name:"undeWaterBoy"},
        {id:7,image:require('../../../assets/pets/carnatOcta.jpg'),name:"undeWaterBoy"},
        {id:8,image:require('../../../assets/pets/carnatOcta.jpg'),name:"undeWaterBoy"},
    ]

export default function FamilyScreen() {
    const isFocused = useIsFocused();
    const translateX = useSharedValue(-width);

    const {tabSelected} = useContext(ProfileContext);

    const imageScale = useSharedValue(1);

    useEffect(() => {
        if (tabSelected === 'Family') {
            translateX.value = withTiming(0, { duration: 100 });
        } else {
            translateX.value = withTiming(-width ,{duration: 100});
        }
    }, [tabSelected]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const animatedImageStyle = useAnimatedStyle(()=>({
        transform: [{ scale: imageScale.value}]
    }));

    return (
        <Animated.View id='FamilyContainer' style={[styles.globalContainer, animatedStyle]}>
            <Text style={styles.screenTitle}>
                Family 
            </Text>
            <FlatList data={familyMembers}
            numColumns={2}
            key={1}
            keyExtractor={item=>item.id.toString()}
            renderItem={({item}) => {
                return (
                    <View style={styles.memberCard}>
                        <Image style={styles.memberImage} source={item.image} resizeMode="cover"/>
                    </View>
                )}
            }
            />

        </Animated.View>
    );
}

const styles = StyleSheet.create({
    globalContainer:{
        flex: 1, 
        paddingTop:10,
        
        backgroundColor: "#E6E6FA", // for now just to see the difference , later it should be #D1C4E9 for blending
        
        alignItems: "center", 
        justifyContent: "center"
    },
    screenTitle:{
        alignSelf:'flex-start',
        marginLeft: width/8.7,
        fontWeight:'500',
        fontSize:25,
    },
    memberCard:{
        width:width/2.5,
        height:width/2.5,
        margin: 8,

        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 100,

        overflow:'hidden'
    },
    memberImage:{
        width:width/2.5,
        height:width/2.5,

        transform: [{scale: 1.1}]
    }
})