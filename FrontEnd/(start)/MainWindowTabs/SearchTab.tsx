import { View,Text,StyleSheet } from "react-native";


export default function SearchTab()
{
    return(
        <View style={{flex:1,backgroundColor:'red'}}>
            <View style={{flex:1,backgroundColor:'blue'}}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#A8B5DB',
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})