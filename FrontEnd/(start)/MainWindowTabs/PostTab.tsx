import { View,Text,StyleSheet } from "react-native";


export default function PostTab()
{
    return(
        <View style={styles.container}>
            <Text> Post Tab</Text>
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