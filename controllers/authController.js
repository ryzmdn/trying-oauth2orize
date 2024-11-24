const oauth2orize = require("oauth2orize");
const authService = require("../services/authService");

const server = oauth2orize.createServer();

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { accessToken, refreshToken } = await authService.authenticate(
      username,
      password
    );

    res.json({
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: "Bearer",
    });
  } catch (err) {
    next(err);
  }
};

exports.authorize = [
  server.authorize((clientId, redirectUri, done) => {
    Client.findOne({ clientId }, (err, client) => {
      if (err) return done(err);
      if (!client) return done(null, false);
      if (client.redirectUri !== redirectUri) return done(null, false);
      return done(null, client, redirectUri);
    });
  }),
  (req, res) => {
    res.render("dialog", {
      transactionID: req.oauth2.transactionID,
      user: req.user,
      client: req.oauth2.client,
    });
  },
];
