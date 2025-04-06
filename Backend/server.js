import express from 'express'
import cors from 'cors';



const app=express();

app.use(cors());

app.get("/", (req, res)=>{
    res.send("Server is ready");
});


app.listen(5000, () => {
    console.log("Server started at http://localhost:5000");
});