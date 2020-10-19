const auth = async (req, res, next) => {
  try {
    const userId = req.header("Authorization").replace("Bearer ", "");
    req.userId = userId;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
