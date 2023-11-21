const { Request, Response } = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const secretKey = process.env.SECRET_KEY || 'suaChaveSecreta';

const signUp = async (req, res) => {
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

    const token = jwt.sign({ userId: newUser.id }, secretKey, { expiresIn: '30m' });

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

const signIn = async (req, res) => {
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

    const token = jwt.sign({ userId: updatedUser.id }, secretKey, { expiresIn: '30m' });

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

module.exports = { signUp, signIn };
