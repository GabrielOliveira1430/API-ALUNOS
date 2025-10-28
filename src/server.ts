import express from "express";
import { AppDataSource } from "./services/database";
import alunoRoutes from "./routes/alunoRoutes";

const app = express();
app.use(express.json());
app.use("/alunos", alunoRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Banco de dados conectado!");
    app.listen(3000, () =>
      console.log("🚀 Servidor rodando em http://localhost:3000")
    );
  })
  .catch((err:unknown) => console.error("❌ Erro ao conectar com o banco:", err));


  // comando para rodar: 
//npx ts-node-dev src/server.ts