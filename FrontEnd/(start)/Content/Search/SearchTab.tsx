import { View,StyleSheet, TextInput, TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { useEffect, useRef, useState } from "react";

import { ModerateS, Hp, SetUnsafeAreaBackgroundColor } from "../../GlobalVars";
import { useIsFocused } from "@react-navigation/native";

export default function SearchTab()
{
    const isFocused = useIsFocused();

    const inputRef = useRef<TextInput>(null);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
            if (isFocused)
                SetUnsafeAreaBackgroundColor('cyan')
        }, [isFocused]);

    return(
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <TouchableOpacity style={styles.searchButton}>
                    <Ionicons name="search" size={ModerateS(17)} color="black" />
                </TouchableOpacity>
                <TextInput 
                    style={styles.searchTextInput}
                    placeholder="Search"
                    ref={inputRef}
                    inputMode="search"
                    maxLength={150}
                    onChangeText={(text) => setSearchText(text)}
                />
                <TouchableOpacity style={[styles.searchClearbutton,{opacity: searchText.length === 0 ? 0 : 1}]}
                    disabled={searchText.length === 0}
                    onPress={() => {
                        inputRef.current?.clear();
                        setSearchText('');
                    }}
                >
                    <Ionicons name="close" size={ModerateS(17)} color="black" />
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
        position: 'absolute',
        top: Hp(6.2),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        
        height: ModerateS(35),
        width: '90%',

        borderWidth: 1.3,
        borderRadius: 13,

        backgroundColor: 'transparent',
    },

    searchTextInput: {
        width: '80%',
    },

    searchButton: {
        paddingHorizontal: ModerateS(9),
        height: ModerateS(35),
        justifyContent: 'center',
    },

    searchClearbutton: {
        paddingHorizontal: ModerateS(9),
        height: ModerateS(35),
        justifyContent: 'center',
    },
})