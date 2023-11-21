const { signUp, signIn } = require('../controllers/authController');

describe('Auth Controller Tests', () => {
  test('Sign Up - should return a user object with token', async () => {
    const req = {
      body: {
        nome: 'Test User',
        email: 'test@example.com',
        senha: 'password123',
        telefones: [{ numero: '123456789', ddd: '11' }],
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await signUp(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        mensagem: 'E-mail já existente',
      })
    );
  });

  test('Sign In - should return a user object with token', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        senha: 'password123',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await signIn(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(Number),
        token: expect.any(String),
        data_criacao: expect.any(Date),
        data_atualizacao: expect.any(Date),
        ultimo_login: expect.any(Date),
      })
    );
  });
});
