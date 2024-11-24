const crypto = require("crypto");
const Token = require("../models/token");

class TokenService {
  async createAccessToken(user) {
    const token = crypto.randomBytes(32).toString("hex");
    await Token.create({
      token,
      tokenType: "access",
      userId: user._id,
      scope: user.scope,
      expiresAt: new Date(Date.now() + 3600000), // 1 hour
    });
    return token;
  }

  async createRefreshToken(user) {
    const token = crypto.randomBytes(32).toString("hex");
    await Token.create({
      token,
      tokenType: "refresh",
      userId: user._id,
      scope: user.scope,
      expiresAt: new Date(Date.now() + 7 * 24 * 3600000), // 7 days
    });
    return token;
  }

  async validateToken(token, type) {
    const tokenDoc = await Token.findOne({ token, tokenType: type }).populate(
      "user"
    );

    if (!tokenDoc || tokenDoc.expiresAt < new Date()) {
      return null;
    }

    return tokenDoc;
  }

  async revokeAllUserTokens(userId) {
    await Token.deleteMany({ userId });
  }
}

module.exports = new TokenService();
