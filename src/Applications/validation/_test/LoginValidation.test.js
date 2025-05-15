const LoginValidation = require('../LoginValidation');

describe('LoginValidation', () => {
  describe('payload function', () => {
    it('should throw error when payload did not contain needed property', () => {
      // Arrange
      const payload = {
        username: '',
        password: 'hay',
      };

      // Action and Assert
      expect(() => LoginValidation.payload(payload)).toThrow(
        'LOGIN_USER.NOT_CONTAIN_NEEDED_PROPERTY'
      );
    });

    it('should validate payload correcty', () => {
      // Arrange
      const payload = {
        username: 'user01',
        password: 'hayhay',
      };

      // Action and Assert
      expect(() => LoginValidation.payload(payload)).not.toThrow(
        'LOGIN_USER.NOT_CONTAIN_NEEDED_PROPERTY'
      );
    });
  });
});
