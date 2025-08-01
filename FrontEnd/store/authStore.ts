import { create } from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SetFirebaseToken } from '../(start)/GlobalVars.ts';
import { useUserProfileStore } from './profileStore.ts';
import { auth } from './firebaseConfig';
import { signInWithCustomToken } from 'firebase/auth';

//in typescript trebuie sa fii precis 
interface AuthUserStore {
    //data attributes
    user: any; // Sau un tip mai clar dacă ai definit userul
    
    //status attributes
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isAuthenticating: boolean;

    //methods
    signup: (credentials: { email: string; username?: string; password: string; isAdoptionCentre: boolean }) => Promise<void>;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    authCheck: () => Promise<void>;
  }
  

/*
Ma folosesc de zustand pentru a face un hook personalizat care 
imi da la orice moment statusul userului, Exemplu:
Daca da click pe signup se apeleaza functia si ii schimba isSinginUp
in TRUE, vezi mai jos.
Cu ajutorul acestui hook putem urmari statusul userului.
"set" este o functie similara cu setState care actualizeaza
statusul userului.(Claudiu isi amintest de cand am vorbit de hookuri,
restul cititi despre React hooks de pe w3school)
*/

export const useAuthUserStore = create<AuthUserStore>((set)=>({
    user: null,

    isSigningUp:false,
    isLoggingIn:false,
    isAuthenticating: false,
    
    signup: async(credentials) =>
    {

        //asa trebuie sa se importeze envVars , nu direct importat sus , altfel trebuie compilat de fiecare data cand e modificat
        const module = await import('../envVars.js');
        const ENV_VARS = module.ENV_VARS;

        try{
            set({isSigningUp: true});
            //trimitem date spre backend
            //aici restul puteti pune localhost eu am pus asa pt ca eu folosesc telefonul deci device extern
            console.log(credentials)

            //! Intrati in fisierul de envVars pentru a vede de unde e ip-ul si port-ul
            const response = await axios.post("http://"+ENV_VARS.SERVER_IP+":"+ENV_VARS.PORT+"/api/v1/auth/signup", credentials);
            set({user: response.data.user, isSigningUp: false});
        }catch(err){
            set({user: null, isSigningUp: false});
            throw(err.response.data.message)
        }
    },

    login: async(credentials)=>
    {
        try{
        const module = await import('../envVars.js');
        const ENV_VARS = module.ENV_VARS;

            set({isLoggingIn: true});
            //trimitem data spre backend
            console.log(credentials);
            //aici restul puteti pune localhost eu am pus asa pt ca eu folosesc telefonul deci device extern
            console.log("PORT: " + ENV_VARS.PORT, "IP: " + ENV_VARS.SERVER_IP)

            //! Intrati in fisierul de envVars pentru a vede de unde e ip-ul si port-ul
            const response = await axios.post("http://"+ENV_VARS.SERVER_IP+":"+ENV_VARS.PORT+"/api/v1/auth/login", credentials);
            console.log("JWT received: ", !!response.data.jwt);
            console.log("Firebase token received: ", !!response.data.firebaseToken);
            
            
            const firebaseToken = response.data.firebaseToken
            SetFirebaseToken(firebaseToken);
            signInWithCustomToken(auth,firebaseToken);


            await AsyncStorage.setItem('token', response.data.jwt);

            const authUser = response.data.user;

            set({user: authUser, isLoggingIn: false});
            useUserProfileStore.getState().user = authUser;
        
        }catch(err){
            set({user: null, isLoggingIn: false});
            throw(err.response.data.message)
        }
    },

    authCheck: async()=>
    {
        set({ isAuthenticating: true });

        const module = await require('../envVars.js');
        const ENV_VARS = module.ENV_VARS;

        const token = await AsyncStorage.getItem('token');
        console.log("Token found: ", !!token);

        if (!token) {
            set({ isAuthenticating: false });
            throw new Error("No token found, please log in again.");
        }

        try {
            const response = await axios.get("http://"+ENV_VARS.SERVER_IP+":"+ENV_VARS.PORT+"/api/v1/auth/authenticate", {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("Firebase token received: ", !!response.data.firebaseToken);
            
            const firebaseToken = response.data.firebaseToken
            SetFirebaseToken(firebaseToken);
            signInWithCustomToken(auth,firebaseToken).catch(err=>console.log(err));

            const authUser = response.data.user;

            set({ user: authUser, isAuthenticating: false });
            useUserProfileStore.getState().user = authUser;
        } catch (error) {
            console.error("Error authenticating user:", error);
            set({ isAuthenticating: false });
            //TODO clear AsyncStorage depending on the error
            throw new Error(error.response?.data?.message || "Failed to authenticate user");
        }
    },
}))