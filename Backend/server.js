import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Server is ready lol");
});

app.get("/test", (req, res) =>{
    const [mesaj] = req.body;
});

mongoose.connect(process.env.MONGO_URI, {
})
.then(()=>{
    console.log("Conectare reusita");
}).catch(err =>{
    console.log(err);
});

const mesajSchema = new mongoose.Schema({
    mesaj: String
});

const Mesaj = mongoose.model('Mesaj', mesajSchema);

const newMesaj = new Mesaj({
    mesaj: 'A mers'
});

app.post('/messages', (req, res)=>{
    console.log(req.body);
    const { mesaj } = req.body;
    new Mesaj({mesaj: mesaj}).save();
    res.json({success:true, message: 'Mesajul a fost primit cu succes'});
});

newMesaj.save()
.then(()=>{
    console.log("merge");
});

app.listen(5000, () => {
    console.log("Server started at http://localhost:5000");
});