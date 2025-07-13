import { View,Text,StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'

export default function SearchTab()
{
    return(
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <TouchableOpacity style={styles.searchButton}>
                    <Ionicons name="search" size={20} color="black" />
                </TouchableOpacity>
                <TextInput 
                inputMode="search"
                maxLength={300}
                style={styles.searchTextInput}>
                    Search
                </TextInput>
                <TouchableOpacity style={styles.searchClearbutton}>
                    <Ionicons name="close" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A8B5DB',
    },

    searchBar: {
        flexDirection: 'row',

        position: 'absolute',
        height: 40,
        top: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',

        width: '90%',

        borderWidth: 1.3,
        borderRadius: 13,

        backgroundColor: 'transparent',

    },

    searchTextInput: {
        width: '80%',
    },

    searchButton: {

        paddingHorizontal: 10,
    },

    searchClearbutton: {
        paddingHorizontal: 10,
    },
})