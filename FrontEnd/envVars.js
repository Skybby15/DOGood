// import dotenv from 'dotenv'
// dotenv.config();

//nu se poate folosi dotenv pentru partea de front-end ,
//  nu e compatibil cu react-native aparent
//  o sa setez fisieru asta ca pur si simplu sa aiba datele necesare
// ii dau push asa ca sa nu apara erori spontane pentru cine nu observa
// mai incolo fisierul asta ar trebui adaugat la gitignore si setat de fiecare


export const ENV_VARS = {
    PORT: '5000', // trebuie sa coincida cu cel de la server neaparat
    SERVER_IP: '192.168.100.114',
}