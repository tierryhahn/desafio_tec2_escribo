import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const secretKey = 'passaro';

export const getUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    jwt.verify(token, secretKey, async (err: any, decoded: any) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ mensagem: 'Sessão inválida' });
        } else {
          return res.status(401).json({ mensagem: 'Não autorizado' });
        }
      }

      const userId = decoded.userId;

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(401).json({ mensagem: 'Usuário não encontrado' });
      }

      res.status(200).json({
        id: user.id,
        data_criacao: user.dataCriacao,
        data_atualizacao: user.dataCriacao,
        ultimo_login: user.ultimoLogin,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno' });
  }
};