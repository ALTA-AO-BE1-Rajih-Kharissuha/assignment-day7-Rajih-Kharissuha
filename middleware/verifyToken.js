const jwt = require("jsonwebtoken");
const logger = require("./logger");

const verifyUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    logger.error("unautorize", {
      status: 401,
      request: { method: "", path: "/" },
    });
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      logger.error("forbidden", {
        status: 403,
        request: { method: "", path: "/" },
      });
      return res.sendStatus(403);
    }
    req.user = decoded;
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    logger.error("unautorize", {
      status: 401,
      request: { method: "", path: "/" },
    });
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      logger.error("forbidden", {
        status: 403,
        request: { method: "", path: "/" },
      });
      return res.sendStatus(403);
    }
    if (decoded.role !== "admin") {
      logger.error("unautorize", {
        status: 401,
        request: { method: "", path: "/" },
      });
      return res.sendStatus(401);
    }
    req.user = decoded;
    next();
  });
};

module.exports = { verifyUser, verifyAdmin };
