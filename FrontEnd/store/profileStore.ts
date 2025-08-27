import { create } from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from './firebaseConfig';
import { firestore } from './firebaseConfig'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

export interface UserProfileStore {
    //data attributes
    user: any;

    //status attributes
    isLoggingOut: boolean;
    isGettingProfilePic:boolean;

    //methods
    getProfilePic: () => Promise<string>;
    postImage: (imageUri: string) => Promise<void>;
    logout: () => Promise<void>;


}

export const useUserProfileStore = create<UserProfileStore>((set, get) => ({
    user: null,
    isLoggingOut: false,
    isGettingProfilePic: false,

    //to be worked on 
    getProfilePic: async () =>
    {
        const user = get().user;

        console.log("Checking user");
        if(user == null)
        {
            console.error("No user was found!");
            return;
        }

        console.log("Getting path ", user._id);
        const queryRes = query(
            collection(firestore,"ProfilePics"),
            where("UserID","==",user._id)
        );

        const querySnapshot = await getDocs(queryRes);

        const imgPath = [];

        querySnapshot.forEach((doc) => {
            const data : string = doc.get("Path");
            imgPath.push(data);
            console.log("Path taken: ", data);
        });

        const imageRef = ref(storage,imgPath[0]);

        console.log("Downloading image");
        const profilePicURL = await getDownloadURL(imageRef);
        return profilePicURL;
    },

    postImage: async (imageUri: string) => {
        console.log("entering with imageUri:", imageUri);
        if(imageUri == null || imageUri === "")
        {
            console.error("No image URI provided");
            return;
        }

        if(get().user == null)
        {
            console.error("No user is logged in");
            return;
        }

        const response = await fetch(imageUri);
        const blob = await response.blob();

        const path = `users/${get().user._id}/postedImages/${Date.now()}.jpg`;
        const storageRef = ref(storage, path);

        await uploadBytes(storageRef, blob);

        await addDoc(collection(firestore, "PostedImages"), {
            Path: path,
            UserID: get().user._id,
        });

        //const downloadURL = await getDownloadURL(storageRef);
        //console.log("Uploaded & got URL:", downloadURL);
    },

    logout: async () => {
        set({ isLoggingOut: true });
        try {
            await AsyncStorage.removeItem('token');
            set({ user: null });
        } catch (error) {
            console.error("Error logging out:", error);
        } finally {
            set({ isLoggingOut: false });
        }
    },
    
}));