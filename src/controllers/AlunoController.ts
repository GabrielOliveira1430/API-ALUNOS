import { Request, Response } from "express";
import { AppDataSource } from "../services/database";
import { Aluno } from "../entity/Aluno";

const repo = AppDataSource.getRepository(Aluno);

export class AlunoController {
  async criar(req: Request, res: Response) {
    try {
      const aluno = repo.create(req.body);
      const resultado = await repo.save(aluno);
      return res.status(201).json(resultado);
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao criar aluno" });
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const alunos = await repo.find();
      return res.json(alunos);
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao listar alunos" });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await repo.update(id, req.body);
      return res.json({ mensagem: "Aluno atualizado com sucesso!" });
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao atualizar aluno" });
    }
  }

  async excluir(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await repo.delete(id);
      return res.json({ mensagem: "Aluno excluído com sucesso!" });
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao excluir aluno" });
    }
  }
}
