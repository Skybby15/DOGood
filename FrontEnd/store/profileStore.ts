import { create } from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProfileStore {
    //data attributes
    user: any;

    //status attributes
    isLoggingOut: boolean;

    //methods
    logout: () => Promise<void>;

}

export const useUserProfileStore = create<UserProfileStore>((set) => ({
    user: null,
    isLoggingOut: false,

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