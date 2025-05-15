const LoginValidation = {
  payload: (payload) => {
    if (!payload.username || !payload.password) {
      throw new Error('LOGIN_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }
  },
};

module.exports = LoginValidation;
