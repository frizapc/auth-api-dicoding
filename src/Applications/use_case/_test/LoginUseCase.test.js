const LoginValidation = require('../../validation/LoginValidation');
const TokenRepository = require('../../../Domains/tokens/TokenRepository');
const UserRepository = require('../../../Domains/users/UserRepository');
const PasswordHash = require('../../security/PasswordHash');
const LoginUseCase = require('../LoginUseCase');

describe('LoginUseCase', () => {
  it('should orchestrating the login action correctly', async () => {
    // Arrange
    const useCasePayload = {
      username: 'dicoding',
      password: 'secret',
    };
    const dummyUser = { id: 99, password: 'encrypted_password' };

    /** creating dependency of use case */
    const mockLoginValidation = LoginValidation;
    const mockUserRepository = new UserRepository();
    const mockPasswordHash = new PasswordHash();
    const mockTokenRepository = new TokenRepository();

    /** mocking needed function */
    mockLoginValidation.payload = jest.fn().mockImplementation(() => true);
    mockUserRepository.findByUsername = jest
      .fn()
      .mockImplementation(() => Promise.resolve(dummyUser));
    mockPasswordHash.compare = jest.fn().mockImplementation(() => {
      return Promise.resolve(true);
    });
    mockTokenRepository.generateAccessToken = jest
      .fn()
      .mockImplementation(() => 'access_token');
    mockTokenRepository.generateRefreshToken = jest
      .fn()
      .mockImplementation(() => 'refresh_token');
    mockTokenRepository.addRefreshToken = jest.fn().mockImplementation(() => {
      return { accessToken: 'access_token', refreshToken: 'refresh_token' };
    });

    /** creating use case instance */
    const getTokenUseCase = new LoginUseCase({
      loginValidation: mockLoginValidation,
      userRepository: mockUserRepository,
      passwordHash: mockPasswordHash,
      tokenRepository: mockTokenRepository,
    });

    // Action
    const authenticateToken = await getTokenUseCase.execute(useCasePayload);

    // Assert
    expect(authenticateToken).toStrictEqual({
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    });
    expect(mockLoginValidation.payload).toHaveBeenCalledWith(useCasePayload);
    expect(mockUserRepository.findByUsername).toHaveBeenCalledWith(
      useCasePayload.username
    );
    expect(mockPasswordHash.compare).toHaveBeenCalledWith(
      useCasePayload.password,
      dummyUser.password
    );
    expect(mockTokenRepository.generateAccessToken).toHaveBeenCalledWith(
      dummyUser.id
    );
    expect(mockTokenRepository.generateRefreshToken).toHaveBeenCalledWith(
      dummyUser.id
    );
    expect(mockTokenRepository.addRefreshToken).toHaveBeenCalledWith(
      'refresh_token'
    );
  });
});
