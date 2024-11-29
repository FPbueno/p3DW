import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/eventosRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api",  router);

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/evento";

async function connectDB(){
    try{
        await mongoose.connect(uri);
        console.log("Conexão com o mongoDB estabelecida com sucesso!");
    } catch (error){
        console.error("Erro ao conectar com o mongoDB", error);
        process.exit(1);
    };
};

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`rodando na url http://localhost/${PORT}/api`);
    await connectDB();
});