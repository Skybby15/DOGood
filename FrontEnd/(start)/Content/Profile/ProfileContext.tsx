import { createContext } from 'react';

interface ProfileContextType {
    tabSelected: string;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export default ProfileContext;
