/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
const Jwt = require('@hapi/jwt');
const TokenRepository = require('../../Domains/tokens/TokenRepository');
const config = require('../../Commons/config');

class TokenRepositoryPostgres extends TokenRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async addRefreshToken(token) {
    const query = {
      text: 'INSERT INTO authentications VALUES($1) RETURNING token',
      values: [token],
    };

    const result = await this._pool.query(query);

    return result.rows[0].token;
  }

  generateAccessToken(id) {
    return Jwt.token.generate(id, config.token.accessTokenKey);
  }

  generateRefreshToken(id) {
    return Jwt.token.generate(id, config.token.refreshTokenKey);
  }
}

module.exports = TokenRepositoryPostgres;
