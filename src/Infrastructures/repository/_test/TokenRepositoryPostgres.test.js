const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const pool = require('../../database/postgres/pool');
const TokenRepositoryPostgres = require('../TokenRepositoryPostgres');

describe('TokenRepositoryPostgres', () => {
  afterEach(async () => {
    await AuthenticationsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addRefreshToken function', () => {
    it('should add new token to database', async () => {
      // Arrange
      const tokenRepositoryPostgres = new TokenRepositoryPostgres(pool);

      // Action
      await tokenRepositoryPostgres.addRefreshToken('new_token');

      // Assert
      const token = await AuthenticationsTableTestHelper.findToken('new_token');
      expect(token).toHaveLength(1);
    });
  });
});
