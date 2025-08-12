import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator, Touchable, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { Wp, Hp, ModerateS, colorSet } from "../../../GlobalVars";
import { requestCameraPermissionsAsync, launchCameraAsync } from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { PostNavList } from "../PostTypes";

export default function SelectImageTab() {
  const [imageSelected, setImageSelected] = useState<string | null>(null);
  const [imagesSelectedSet, setImagesSelectedSet] = useState<Set<string>>(new Set());
  const [isSelectingMultiple, setIsSelectingMultiple] = useState(false);
  const [media, setMedia] = useState<any[]>([]);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigator = useNavigation<NavigationProp<PostNavList>>();

  useEffect(() => {
    loadMore();
  }, []);

  const loadMore = useCallback(async () => {
    if (loading || !hasNextPage) return;

    setLoading(true);

    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      setLoading(false);
      return;
    }

    const result = await MediaLibrary.getAssetsAsync({
      mediaType: ['photo'],
      first: 30,
      after: endCursor ?? undefined,
      sortBy: MediaLibrary.SortBy.creationTime,
    });

    setMedia((prev) => [...prev, ...result.assets]);
    setEndCursor(result.endCursor);
    setHasNextPage(result.hasNextPage);
    setLoading(false);
  }, [loading, hasNextPage, endCursor]);

  const openCamera = useCallback(async () => {
    const camPerm = await requestCameraPermissionsAsync();
    if (!camPerm.granted) return;

    const result = await launchCameraAsync();
    if (result.assets && result.assets.length > 0) {
      setImageSelected(result.assets[0].uri);
    }
  }, []);

  const handleSelectImage = useCallback((uri: string) => {
    setImagesSelectedSet(prev => {
      const newSet = new Set(prev);
      if (newSet.has(uri)) {
        newSet.delete(uri);
        if (newSet.size === 0) setIsSelectingMultiple(false);
      } else {
        newSet.add(uri);
      }
      return newSet;
    });
  }, []);

  const handlePress = useCallback((item: any) => {
    if (isSelectingMultiple) {
      handleSelectImage(item.uri);
    } else {
      setImageSelected(item.uri);
      navigator.navigate("Preview", { imageUri: item.uri });
    }
  }, [isSelectingMultiple, handleSelectImage, navigator]);

  const handleLongPress = useCallback((item: any) => {
    setIsSelectingMultiple(true);
    setImagesSelectedSet(prev => new Set(prev).add(item.uri));
  }, []);

  const handleRemoveSelectedImage = useCallback((uri: string) => {
    setImagesSelectedSet(prev => {
      if (!prev.has(uri)) 
      {
        console.log("Deleting an unexisting selected image ???");
        return prev;
      }

      const newSet = new Set(prev);
      newSet.delete(uri);
      if (newSet.size === 0) 
        setIsSelectingMultiple(false);

      return newSet;
    });
  }, []);

  // For selected images row
  const selectedImagesArray = Array.from(imagesSelectedSet);

  return (
    <View style={styles.container}>
      <Text style={styles.topText}>New post</Text>
      <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
        <Ionicons name='camera' size={ModerateS(34)} color={colorSet[1]} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.nextButton, { opacity: imageSelected == null ? 0.4 : 1 }]}
        onPress={() => navigator.navigate("Preview", { imageUri: imageSelected })}
        disabled={imageSelected == null}
        activeOpacity={0.4}
      >
        <Ionicons name='arrow-forward' size={ModerateS(34)} color={colorSet[1]} />
      </TouchableOpacity>
      <View style={styles.galleryList}>
        {selectedImagesArray.length !== 0 && (
          <View style={styles.selectedImagesContainer}>
            <FlatList
              data={selectedImagesArray}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={({ item }) => (
                <Pressable onPress={() => handleRemoveSelectedImage(item)}>
                  <Ionicons name="close" size={ModerateS(20)} color={'white'} style={styles.removeSelectedImageIcon}/>
                  <Image source={{ uri: item }} style={styles.selectedImage} />
                </Pressable>
              )}
            />
          </View>
        )}
        <FlatList
          data={media}
          keyExtractor={(item) => item.id}
          numColumns={3}
          extraData={imagesSelectedSet}
          initialNumToRender={12}
          windowSize={5}
          maxToRenderPerBatch={12}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => {
            const isSelected = imagesSelectedSet.has(item.uri);

            return(
              <TouchableOpacity 
                onPress={() => handlePress(item)}
                onLongPress={() => handleLongPress(item)}
                delayLongPress={250}>
                  
                {isSelectingMultiple && (
                  <View style={isSelected ? styles.selectedDot : styles.unselectedDot} />
                )}
                <Image
                  source={{ uri: item.uri }}
                  style={[
                    styles.galleryImage,
                    isSelectingMultiple && { borderWidth: isSelected ? 1 : 0.7, borderColor: isSelected ? colorSet[1] : 'transparent' }
                  ]}
                />
              </TouchableOpacity>
            )
          }}
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

  topText: {
    position: 'absolute',
    left: Wp(50) - ModerateS(60),
    top: Hp(0.5),
    textAlign: 'center',
    width: ModerateS(120),
    fontSize: ModerateS(18),
    fontWeight: 'bold',
  },

  selectedImagesContainer: {
    flexDirection: 'row',
    width: Wp(100),
    height: Hp(5.3),
    backgroundColor: colorSet[1],
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  removeSelectedImageIcon: {
    position:'absolute',
    zIndex:1,
    right:0,
    top:0,
  },

  selectedImage: {
    width: Hp(4.3),
    height: Hp(4.3),
    marginLeft: 10,
  },

  selectedDot: {
    width: ModerateS(20),
    height: ModerateS(20),
    borderRadius: 100,
    backgroundColor: colorSet[1],
    zIndex: 1,
    position: 'absolute',
    right: ModerateS(8),
    top: ModerateS(8),
    opacity: 1,
  },

  unselectedDot: {
    width: ModerateS(20),
    height: ModerateS(20),
    borderRadius: 100,
    zIndex: 1,
    position: 'absolute',
    right: ModerateS(8),
    top: ModerateS(8),
    opacity: 1,
    borderWidth:1,
    borderColor: colorSet[1],
  },

  cameraButton: {
    width: Wp(15),
    height: Hp(5),
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: Hp(0),
    left: Wp(1),
  },

  nextButton: {
    width: Wp(11),
    height: Hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: Hp(0),
    right: Wp(2),
    borderRadius: ModerateS(150),
    borderColor: '#2600ffff',
    borderWidth: 1,
  },

  galleryList: {
    width: Wp(100),
    height: Hp(85),
    position: 'absolute',
    bottom: 0,
    borderWidth: 1,
    borderTopColor: colorSet[1],
    alignItems: 'center',
  },

  galleryImage: {
    width: Wp(33),
    height: Wp(33),
  }
});