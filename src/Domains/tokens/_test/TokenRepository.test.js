const TokenRepository = require('../TokenRepository');
describe('TokenRepository interface', () => {
  it('should throw error when invoke abstract behavior', () => {
    // Arrange
    const tokenRepository = new TokenRepository();

    // Action and Assert
    expect(() => tokenRepository.generateAccessToken({})).toThrow(
      'TOKEN_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    expect(() => tokenRepository.generateRefreshToken({})).toThrow(
      'TOKEN_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    expect(() => tokenRepository.verifyRefreshToken({})).toThrow(
      'TOKEN_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    expect(tokenRepository.addRefreshToken({})).rejects.toThrow(
      'TOKEN_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
  });
});
