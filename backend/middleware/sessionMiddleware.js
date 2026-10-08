const sessionAuth = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  req.user = req.session.user;

  next();
};

module.exports = sessionAuth;