import { create } from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig';

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

        if(user == null)
        {
            console.error("No user was found!");
            return;
        }

        const path = "ColorLogo.png"
        const imageRef = ref(storage,path)
        console.log("ImageRef:",imageRef);

        const downloadUrl = await getDownloadURL(imageRef);

        console.log("URL DOWNLOADED:",downloadUrl);
        return downloadUrl;
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