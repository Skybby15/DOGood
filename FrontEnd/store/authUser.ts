import { create } from 'zustand';
import axios from 'axios';


//in typescript trebuie sa fii precis 
interface AuthUserStore {
    user: any; // Sau un tip mai clar dacă ai definit userul
    isSigningUp: boolean;
    isLoggingIn: boolean;
    signup: (credentials: { email: string; username?: string; password: string; isAdoptionCentre: boolean }) => Promise<void>;
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
    login: async(credentials)=>{
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
            console.log("Yay");
            set({user: response.data.user, isLoggingIn: false});
        
        }catch(err){
            set({user: null, isLoggingIn: false});
            throw(err.response.data.message)
        }
    },
    logout: async()=>{},
    authCheck: async()=>{},
}))