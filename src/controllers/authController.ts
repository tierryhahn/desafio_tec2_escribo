import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const secretKey = 'passaro';

export const signUp = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, telefones } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ mensagem: 'E-mail já existente' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const newUser = await prisma.user.create({
      data: {
        nome,
        email,
        senha: hashedPassword,
        telefones,
      },
    });

    const token = jwt.sign({ userId: newUser.id }, secretKey, { expiresIn: '1h' });

    res.status(201).json({
      id: newUser.id,
      data_criacao: newUser.dataCriacao,
      data_atualizacao: newUser.dataCriacao,
      ultimo_login: newUser.ultimoLogin,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno' });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { ultimoLogin: new Date() },
    });

    const token = jwt.sign({ userId: updatedUser.id }, secretKey, { expiresIn: '1h' });

    res.status(200).json({
      id: updatedUser.id,
      data_criacao: updatedUser.dataCriacao,
      data_atualizacao: updatedUser.dataCriacao,
      ultimo_login: updatedUser.ultimoLogin,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno' });
  }
};