import { View,Text,StyleSheet } from "react-native";
import { SetUnsafeAreaBackgroundColor } from "../../GlobalVars";


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
        backgroundColor: '#b4a8e6ff',
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})