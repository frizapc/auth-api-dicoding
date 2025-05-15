/* eslint-disable class-methods-use-this */
class TokenRepository {
  generateAccessToken(id) {
    throw new Error('TOKEN_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  generateRefreshToken(id) {
    throw new Error('TOKEN_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  verifyRefreshToken(refreshToken) {
    throw new Error('TOKEN_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async addRefreshToken(refreshToken) {
    throw new Error('TOKEN_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = TokenRepository;
