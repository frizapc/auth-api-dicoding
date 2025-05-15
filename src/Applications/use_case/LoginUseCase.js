/* eslint-disable no-underscore-dangle */
class LoginUseCase {
  constructor({
    loginValidation,
    userRepository,
    passwordHash,
    tokenRepository,
  }) {
    this._loginValidation = loginValidation;
    this._userRepository = userRepository;
    this._passwordHash = passwordHash;
    this._tokenRepository = tokenRepository;
  }

  async execute(useCasePayload) {
    this._loginValidation.payload(useCasePayload);

    const { id, password } = await this._userRepository.findByUsername(
      useCasePayload.username,
    );

    await this._passwordHash.compare(useCasePayload.password, password);

    const accessToken = this._tokenRepository.generateAccessToken(id);
    const refreshToken = this._tokenRepository.generateRefreshToken(id);
    await this._tokenRepository.addRefreshToken(refreshToken);

    return { accessToken, refreshToken };
  }
}

module.exports = LoginUseCase;
