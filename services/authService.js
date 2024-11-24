const User = require("../models/user");
const Token = require("../models/token");
const tokenService = require("./tokenService");

class AuthService {
  async authenticate(username, password) {
    const user = await User.findOne({ username });
    if (!user || !(await user.validatePassword(password))) {
      throw new Error("Invalid credentials");
    }

    return this.generateTokens(user);
  }

  async generateTokens(user) {
    const accessToken = await tokenService.createAccessToken(user);
    const refreshToken = await tokenService.createRefreshToken(user);

    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshToken) {
    const token = await Token.findOne({
      token: refreshToken,
      tokenType: "refresh",
    }).populate("user");

    if (!token || token.expiresAt < new Date()) {
      throw new Error("Invalid refresh token");
    }

    await token.remove();
    return this.generateTokens(token.user);
  }

  async revokeToken(token) {
    await Token.deleteOne({ token });
  }
}

module.exports = new AuthService();
