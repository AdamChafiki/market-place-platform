import request from 'supertest';
import app from '@/app';
import * as authService from '@/services/auth.service';

jest.mock('@/services/auth.service');

describe('Auth Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a user successfully', async () => {
    const mockUser = { id: 1, email: 'test@examplee.com', token: 'mockToken' };
    (authService.registerUser as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app).post('/api/auth/register').send({
      email: 'aaaaa@gmail.com',
      password: 'secusssre1234',
      username: 'Aaasassss',
      role: 'buyer',
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockUser);
    expect(authService.registerUser).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'Password123',
    });
  });

  it('should return 400 for invalid registration data', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ email: 'invalid', password: '' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe({
      success: false,
      message: expect.any(String),
    });
  });
});
