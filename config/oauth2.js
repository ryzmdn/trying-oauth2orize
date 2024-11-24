const oauth2orize = require("oauth2orize");
const crypto = require("crypto");
const Token = require("../models/token");

const server = oauth2orize.createServer();

// Client credentials exchange
server.exchange(
  oauth2orize.exchange.clientCredentials((client, done) => {
    const token = crypto.randomBytes(32).toString("hex");
    const accessToken = new Token({
      token,
      clientId: client.clientId,
      expiresAt: new Date(Date.now() + 3600000), // 1 hour
    });

    accessToken
      .save()
      .then(() => done(null, token))
      .catch((err) => done(err));
  })
);

// Authorization code grant type
server.grant(
  oauth2orize.grant.code((client, redirectURI, user, ares, done) => {
    const code = crypto.randomBytes(16).toString("hex");
    const authCode = new Token({
      token: code,
      clientId: client.clientId,
      userId: user.id,
      redirectUri: redirectURI,
      expiresAt: new Date(Date.now() + 600000), // 10 minutes
    });

    authCode
      .save()
      .then(() => done(null, code))
      .catch((err) => done(err));
  })
);

module.exports = server;
