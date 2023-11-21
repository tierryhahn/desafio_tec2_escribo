const { getUser } = require('../controllers/userController');

describe('User Controller Tests', () => {
  test('Get User - should return user data', async () => {
    const req = {
      headers: {
        authorization: 'Bearer yourAccessTokenHere',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getUser(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        mensagem: 'Não autorizado',
      })
    );
  });
});