import { StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import axios from 'axios';

export default function TabOneScreen() {
  const [mesaj, setMesaj] = useState("");

  const handleClick = async ()=>{
    console.log(mesaj);
    try{
      const response = await axios.post('http://localhost:5000/messages', {
        mesaj: mesaj
      });

      if(response.data.success){

      }
    }catch(error){
      
    }
  }


  return (
    <div>
      <input
        type="text"
        value={mesaj}
        onChange={(e) => setMesaj(e.target.value)}  // Actualizează mesajul
      />
      <button onClick={handleClick}>Trimite</button> {/* Asociază funcția handleClick */}
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
