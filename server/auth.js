module.exports = {
  requireAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).json({ error:'You must be signed in to view this resource' });
    }
    next();
  },
  forceSSL: function (req, res, next) {
    if (process.env.USE_SSL === 'true' && req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    return next();
  }
};
