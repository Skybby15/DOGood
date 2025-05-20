import { View,Text,StyleSheet } from "react-native";


export default function SearchTab()
{
    return(
        <View style={styles.container}>
            <Text> Search Tab</Text>
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