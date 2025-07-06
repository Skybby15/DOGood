import { createContext } from 'react';
import { UserProfileStore } from '../../store/profileStore'; // if exported

interface MainContextType {
  navigateToLogin: () => void;
  store: UserProfileStore;
}

const MainContext = createContext<MainContextType | null>(null);

export default MainContext;