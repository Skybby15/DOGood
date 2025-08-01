import { create } from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from './firebaseConfig';
import { firestore } from './firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore';

export interface UserProfileStore {
    //data attributes
    user: any;

    //status attributes
    isLoggingOut: boolean;
    isGettingProfilePic:boolean;

    //methods
    getProfilePic: () => Promise<string>;
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

        console.log("Getting path");
        const queryRes = query(
            collection(firestore,"ProfilePics"),
            where("UserID","==",user._id)
        );

        const querySnapshot = await getDocs(queryRes);

        const imgPath = [];

        querySnapshot.forEach((doc) => {
            const data : string = doc.get("Path");
            imgPath.push(data);
        });

        const imageRef = ref(storage,imgPath[0]);

        console.log("Downloading image");
        const profilePicURL = await getDownloadURL(imageRef);
        return profilePicURL;
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