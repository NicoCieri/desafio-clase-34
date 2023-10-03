import passport from "passport";

const requireAuth = (req, res, next) => {
  passport.authenticate("current", { session: false }, (err, user) => {
    if (err) {
      return res.status(400).json({ error: "Error en la autenticación" });
    }

    if (!user) {
      return res.status(401).json({ error: "Not authorized" });
    }

    req.user = user;
    next();
  })(req, res, next);
};

export default requireAuth;
