import { create } from 'zustand';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { ENV_VARS } from '../envVars.js'


//in typescript trebuie sa fii precis 
interface AuthUserStore {
    user: any; // Sau un tip mai clar dacă ai definit userul
    isSigningUp: boolean;
    isLoggingIn: boolean;
    signup: (credentials: { email: string; username?: string; password: string }) => Promise<void>;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
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
    signup: async(credentials) =>{
        try{
            set({isSigningUp: true});
            //trimitem date spre backend
            //aici restul puteti pune localhost eu am pus asa pt ca eu folosesc telefonul deci device extern

            //! Intrati in fisierul de envVars pentru a vede de unde e ip-ul si port-ul
            const response = await axios.post("http://"+ENV_VARS.SERVER_IP+":"+ENV_VARS.PORT+"/api/v1/auth/signup", credentials);
            set({user: response.data.user, isSigningUp: false});
            //toast e notificare
            Toast.show({
                type: 'success',
                text1: 'Signup successful!',
              });
        }catch(err){
            Toast.show({
                type: 'error',
                text1: err.response.data.message,
              });
            set({isSigningUp:false, user:null});
        }
    },
    login: async(credentials)=>{
        try{
            set({isLoggingIn: true});
            //trimitem data spre backend
            console.log(credentials);
            //aici restul puteti pune localhost eu am pus asa pt ca eu folosesc telefonul deci device extern
            console.log("PORT: " + ENV_VARS.PORT, "IP: " + ENV_VARS.SERVER_IP)

            //! Intrati in fisierul de envVars pentru a vede de unde e ip-ul si port-ul
            const response = await axios.post("http://"+ENV_VARS.SERVER_IP+":"+ENV_VARS.PORT+"/api/v1/auth/login", credentials);
            console.log("Yay");
            set({user: response.data.user, isLoggingIn: false});
            //toast e notificarew
            Toast.show({
                type: 'success',
                text1: 'Signup successful!',
              });
              console.log("Success");
        }catch(err){
            Toast.show({
                type: 'error',
                text1: err.response.data.message,
              });
            set({user: null, isLoggingIn: false});
            console.log("Fail");
        }
    },
    logout: async()=>{},
    authCheck: async()=>{},
}))