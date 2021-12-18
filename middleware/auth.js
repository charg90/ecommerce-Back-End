const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const { authorization } = req.headers;
  console.log("auth0", authorization);
  //const token = header.split(" ")[1];
  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "no tiene permisos" });
  }

  jwt.verify(token, process.env.SECRET_WORD, (err, user) => {
    if (err) return res.sendStatus(403).json({ msg: "no tienes permisos" });
    req.user = user;
    console.log(req.user);
    next();
  });
};
