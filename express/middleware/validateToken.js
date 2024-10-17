const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID);

async function validateAccessToken(req, res, next) {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(403).json({ error: 'Access token missing' });
    }

    const payload = await verifyToken(token);

    next();
  } catch (err) {
    console.error('Token validation failed:', err);
    return res.status(403).json({ error: 'Access token is invalid or expired' });
  }
}

async function verifyToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,  // Specify the CLIENT_ID of the app
  });
  const payload = ticket.getPayload();
  return payload;
}

module.exports = validateAccessToken;