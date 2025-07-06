import { View,Text,StyleSheet } from "react-native";


export default function FeedTab()
{
    return(
        <View style={styles.container}>
            <Text>Feed/Home Tab</Text>
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
    post: {
        backgroundColor: 'black',
        width:"95%",
        height:450,
        borderRadius:20,
    }

})